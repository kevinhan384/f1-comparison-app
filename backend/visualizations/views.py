from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import UserSelection
from .serializers import UserSelectionSerializer

import fastf1
fastf1.Cache.enable_cache("visualizations/cache")

import json
from collections import defaultdict

@api_view(["GET"])
def get_user_selections(request):
    user_selections = UserSelection.objects.all()
    serializer = UserSelectionSerializer(user_selections, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_races(request, year):
    try:
        races = fastf1.get_event_schedule(year)["EventName"].to_json()

        return Response(races, status=status.HTTP_200_OK)
    except Exception as err:
        return Response(json.dumps(str(err)), status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_drivers(request, year, racename):
    try:
        racedata = fastf1.get_session(year, racename, 'R')
        racedata.load()

        driver_nums = racedata.drivers

        drivers = []
        for driver_num in driver_nums:
            drivers.append(racedata.get_driver(driver_num).to_json())

        return Response(json.dumps(drivers), status=status.HTTP_200_OK)
    except Exception as err:
        return Response(json.dumps(str(err)), status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
def get_laps(request, year, racename, driver1, driver2):
    try:
        serializer = UserSelectionSerializer(data={ "year" : year, "racename" : racename, "driver1" : driver1, "driver2" : driver2 })

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()

        session = fastf1.get_session(year, racename, 'R')
        session.load(telemetry=False, weather=False)

        data = {}
        data[driver1] = session.laps.pick_driver(driver1).to_json()
        data[driver2] = session.laps.pick_driver(driver2).to_json()

        return Response(json.dumps(data), status=status.HTTP_200_OK)
    except Exception as err:
        return Response(json.dumps(str(err)), status=status.HTTP_400_BAD_REQUEST)

# class UserSelectionSpeedPlot(generics.ListAPIView):
#     queryset = UserSelection.objects.all()
#     serializer_class = UserSelectionSerializer

#     def get(self, request):
#         latest_selection = UserSelection.objects.all().last()
#         driver1 = latest_selection.driver1
#         driver2 = latest_selection.driver2
#         year = latest_selection.year
#         race = latest_selection.race
#         session = latest_selection.session
        
#         fastf1.plotting.setup_mpl(misc_mpl_mods=False)
#         session = fastf1.get_session(year, race, session)
#         session.load()

#         driver1_lap = session.laps.pick_driver(driver1).pick_fastest()
#         driver2_lap = session.laps.pick_driver(driver2).pick_fastest()

#         driver1_tel = driver1_lap.get_car_data().add_distance()
#         driver2_tel = driver2_lap.get_car_data().add_distance()

#         driver1_color = fastf1.plotting.driver_color(driver1)
#         driver2_color = fastf1.plotting.driver_color(driver2)

#         fig, ax = plt.subplots()
#         ax.plot(driver1_tel['Distance'], driver1_tel['Speed'], color=driver1_color, label=driver1)
#         ax.plot(driver2_tel['Distance'], driver2_tel['Speed'], color=driver2_color, label=driver2)

#         ax.set_xlabel('Distance in m')
#         ax.set_ylabel('Speed in km/h')

#         ax.legend()
#         plt.suptitle(f"Fastest Lap Comparison \n "
#                     f"{race} {year} {session}")
        
#         buf = io.BytesIO()
#         plt.savefig(buf, format='png')
#         buf.seek(0)
#         image_base64 = base64.b64encode(buf.read()).decode('utf-8')
#         buf.close()

#         return JsonResponse({'image': image_base64})
    
# class UserSelectionPositionPlot(generics.ListAPIView):
#     queryset = UserSelection.objects.all()
#     serializer_class = UserSelectionSerializer

#     def get(self, request):
#         latest_selection = UserSelection.objects.all().last()
#         driver1 = latest_selection.driver1
#         driver2 = latest_selection.driver2
#         year = latest_selection.year
#         race = latest_selection.race
        
#         fastf1.plotting.setup_mpl(mpl_timedelta_support=False, misc_mpl_mods=False,
#                           color_scheme='fastf1')
#         session = fastf1.get_session(year, race, 'R')
#         session.load(telemetry=False, weather=False)

#         fig, ax = plt.subplots(figsize=(8.0, 4.9))
        
#         drv1_laps = session.laps.pick_driver(driver1)
#         drv1_style = fastf1.plotting.get_driver_style(identifier=driver1,
#                                              style=['color', 'linestyle'],
#                                              session=session)
#         drv2_laps = session.laps.pick_driver(driver2)
#         drv2_style = fastf1.plotting.get_driver_style(identifier=driver2,
#                                              style=['color', 'linestyle'],
#                                              session=session)
        
#         ax.plot(drv1_laps['LapNumber'], drv1_laps['Position'],
#             label=driver1, **drv1_style)
#         ax.plot(drv2_laps['LapNumber'], drv2_laps['Position'],
#             label=driver2, **drv2_style)

#         ax.set_ylim([20.5, 0.5])
#         ax.set_yticks([1, 5, 10, 15, 20])
#         ax.set_xlabel('Lap')
#         ax.set_ylabel('Position')

#         ax.legend(bbox_to_anchor=(1.0, 1.02))
#         plt.tight_layout()
#         plt.suptitle(f"Position Comparison \n "
#                     f"{race} {year} Race")
        
#         buf = io.BytesIO()
#         plt.savefig(buf, format='png')
#         buf.seek(0)
#         image_base64 = base64.b64encode(buf.read()).decode('utf-8')
#         buf.close()

#         return JsonResponse({'image': image_base64})