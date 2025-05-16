from datetime import *
import tkinter as tk
from tkinter import messagebox

flights = {
    "AV-101": {"origen": "Lima",
        "destino": "Bogotá",
        "asientos": ["A1", "A2", "B1", "B2"],
        "horario": (15, 30)
    },
    "AV-102": {"origen": "Bogota",
        "destino": "Madrid",
        "asientos": ["A1", "A2", "B1", "B2"],
        "horario": (12, 30)
    }
}

def update_display():
    display.delete(1.0, tk.END)
    for x,y in flights.items():
        linea = f'Flight {x}: {y['origen']} - {y['destino']} | Available Seats: {','.join(y['asientos'])} | Schedule: {time(y['horario'][0],y['horario'][1])}\n'
        display.insert(tk.END,linea)

def seat_reservation():
    flight1=flightEntry.get().strip()
    seat1=seatEntry.get().strip()

    if flight1 not in flights.keys():
        messagebox.showerror("Error", "This flight is not available")
        return
    if seat1 not in flights.get(flight1)['asientos']:
        messagebox.showerror("Error", "This seat is not available")
        return
    (flights.get(flight1)['asientos']).remove(seat1)
    update_display()
def calcultate_percetage():
    update_display()
    display.insert(tk.END,'\n-------------------------------------------------------')
    for x,y in flights.items():
        linea=f'\n{x} :{((80-(len(y['asientos'])))/80)*100}% seats taken'
        display.insert(tk.END,linea)

def generate_report():
    newlist=[]
    for x,y in flights.items():
        l1=[x]
        l1.extend(list(y.values()))
        hora=time(l1[4][0],l1[4][1])
        l1[4]=hora
        newlist.append(l1)
    newlist.sort(key=lambda x: x[4])
    with open('reporte.txt','a') as archive:
        for nline in newlist:
            line = f'Flight: {nline[0]}, Origin: {nline[1]}, Destination: {nline[2]}, Seats: {','.join(nline[3])}, Time: {nline[4]}\n'
            print(line)
            archive.write(line)

root =tk.Tk()
root.title("Flights Reservation")
# Labels
flightLabel = tk.Label(root, text='Flight Code:')
seatLabel = tk.Label(root, text='Seat: ')

#Entries
flightEntry = tk.Entry(root)
seatEntry = tk.Entry(root)

#Buttons
reserveButton = tk.Button(root, text='Reservation', command=seat_reservation)
percentageButton = tk.Button(root, text='Calculate Percentage', command=calcultate_percetage)
generateButton = tk.Button(root, text='Generate Report', command=generate_report)

#Labels position
flightLabel.grid(row=0,column=0)
seatLabel.grid(row=1,column=0)
#Entries position
flightEntry.grid(row=0,column=1)
seatEntry.grid(row=1,column=1)
#Buttons position
reserveButton.grid(row=2,column=0)
percentageButton.grid(row=2,column=1)
generateButton.grid(row=2,column=2)

display = tk.Text(root, height=10, width=120)
display.grid(row=3, column=0, columnspan=3)

update_display()
root.mainloop()