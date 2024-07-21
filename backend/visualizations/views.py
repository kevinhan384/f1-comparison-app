from django.shortcuts import render

# Create your views here.
import fastf1.plotting
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from django.http import JsonResponse, HttpResponse
import io
import base64

def plot_laptimes(request):
    try:
        fastf1.plotting.setup_mpl(misc_mpl_mods=False)
        session = fastf1.get_session(2021, 'Spanish Grand Prix', 'Q')
        session.load()

        ver_lap = session.laps.pick_driver('VER').pick_fastest()
        ham_lap = session.laps.pick_driver('HAM').pick_fastest()

        ver_tel = ver_lap.get_car_data().add_distance()
        ham_tel = ham_lap.get_car_data().add_distance()

        rbr_color = fastf1.plotting.team_color('RBR')
        mer_color = fastf1.plotting.team_color('MER')

        fig, ax = plt.subplots()
        ax.plot(ver_tel['Distance'], ver_tel['Speed'], color=rbr_color, label='VER')
        ax.plot(ham_tel['Distance'], ham_tel['Speed'], color=mer_color, label='HAM')

        ax.set_xlabel('Distance in m')
        ax.set_ylabel('Speed in km/h')

        ax.legend()
        plt.suptitle(f"Fastest Lap Comparison \n "
                    f"{session.event['EventName']} {session.event.year} Qualifying")
        
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        image_base64 = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()

        return JsonResponse({'image': image_base64})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
