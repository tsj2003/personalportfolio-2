from PIL import Image
import numpy as np

def make_transparent():
    try:
        # Load the image
        img = Image.open('public/car.png')
        img = img.convert("RGBA")
        
        # Convert to numpy array
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change all black (also shades of black) pixels to transparent
            # Threshold can be adjusted. 0,0,0 is pure black.
            if item[0] < 20 and item[1] < 20 and item[2] < 20: 
                newData.append((0, 0, 0, 0))
            else:
                newData.append(item)
        
        img.putdata(newData)
        img.save("public/car_transparent.png", "PNG")
        print("Successfully created transparent car image")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    make_transparent()
