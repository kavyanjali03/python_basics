from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from .qrcode_gene import generate_qr

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate(link: str = Form(...), text: str = Form(...)):
    img_base64 = generate_qr(link, text)
    return {"image": f"data:image/png;base64,{img_base64}"}
