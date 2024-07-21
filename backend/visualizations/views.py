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
        driver1 = request.GET.get('driver1')
        driver2 = request.GET.get('driver2')

        if not driver1 or not driver2:
            return JsonResponse({'error': 'Missing one or more parameters!'}, status=400)

        fastf1.plotting.setup_mpl(misc_mpl_mods=False)
        session = fastf1.get_session(2021, 'Spanish Grand Prix', 'Q')
        session.load()

        driver1_lap = session.laps.pick_driver(driver1).pick_fastest()
        driver2_lap = session.laps.pick_driver(driver2).pick_fastest()

        driver1_tel = driver1_lap.get_car_data().add_distance()
        driver2_tel = driver2_lap.get_car_data().add_distance()

        driver1_color = fastf1.plotting.team_color('RBR')
        driver2_color = fastf1.plotting.team_color('MER')

        fig, ax = plt.subplots()
        ax.plot(driver1_tel['Distance'], driver1_tel['Speed'], color=driver1_color, label=driver1)
        ax.plot(driver2_tel['Distance'], driver2_tel['Speed'], color=driver2_color, label=driver2)

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
