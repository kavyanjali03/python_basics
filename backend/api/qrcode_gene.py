import qrcode
from PIL import Image, ImageDraw, ImageFont
import io
import base64

def generate_qr(link: str, text: str) -> str:
    # Step 1: Create QR Code
    qr = qrcode.QRCode(
        version=4,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(link)
    qr.make(fit=True)
    img = qr.make_image(fill_color="purple", back_color="white").convert("RGB")

    # Step 2: Add text
    draw = ImageDraw.Draw(img)
    font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    new_height = img.height + text_height + 20
    new_img = Image.new("RGB", (img.width, new_height), "white")
    new_img.paste(img, (0, 0))
    draw = ImageDraw.Draw(new_img)
    draw.text(((new_img.width - text_width)//2, img.height+10), text, fill="black", font=font)

    # Step 3: Convert image to Base64
    buffered = io.BytesIO()
    new_img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str
