import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont('SegoeUI', 'C:/Windows/Fonts/segoeui.ttf'))
pdfmetrics.registerFont(TTFont('SegoeUI-Bold', 'C:/Windows/Fonts/segoeuib.ttf'))
pdfmetrics.registerFont(TTFont('SegoeUI-Italic', 'C:/Windows/Fonts/segoeuii.ttf'))

pdf_path = r"C:\Users\karay\Documents\antigravity\Civciv Runner\Civciv_Runner_Dokumantasyon.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=A4,
    leftMargin=40,
    rightMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'DocTitle',
    fontName='SegoeUI-Bold',
    fontSize=22,
    leading=28,
    textColor=colors.HexColor('#0f172a'),
    spaceAfter=4
)

subtitle_style = ParagraphStyle(
    'DocSubTitle',
    fontName='SegoeUI',
    fontSize=11,
    leading=16,
    textColor=colors.HexColor('#64748b'),
    spaceAfter=14
)

h1_style = ParagraphStyle(
    'Heading1',
    fontName='SegoeUI-Bold',
    fontSize=13,
    leading=18,
    textColor=colors.HexColor('#1e293b'),
    spaceBefore=12,
    spaceAfter=6
)

body_style = ParagraphStyle(
    'Body',
    fontName='SegoeUI',
    fontSize=9.5,
    leading=14,
    textColor=colors.HexColor('#334155'),
    spaceAfter=6
)

bullet_style = ParagraphStyle(
    'Bullet',
    fontName='SegoeUI',
    fontSize=9.5,
    leading=14,
    textColor=colors.HexColor('#334155'),
    leftIndent=14,
    firstLineIndent=-10,
    spaceAfter=4
)

code_style = ParagraphStyle(
    'CodeStyle',
    fontName='SegoeUI',
    fontSize=8.5,
    leading=12,
    textColor=colors.HexColor('#0957c3')
)

story = []

# Başlık ve Bilgi Kutusu
story.append(Paragraph("Civciv Runner - Teknik & Tasarım Dokümantasyonu", title_style))
story.append(Paragraph("GDG on Campus Bolu Abant İzzet Baysal Üniversitesi | Sürüm: v1.0.0 (Prototip) | Tarih: 11 Ekim 2026", subtitle_style))
story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563eb'), spaceAfter=12))

# 1. Giriş ve Proje Özeti
story.append(Paragraph("1. Proje Genel Bakışı", h1_style))
story.append(Paragraph(
    "Civciv Runner, klasik Google Dino sonsuz koşu mekaniği ile Flappy Bird uçuş dinamiğini harmanlayan retro piksel "
    "sanat tarzında bir web oyunudur. Bolu Abant İzzet Baysal Üniversitesi GDG topluluğu için etkinliklerde yarışma ve "
    "etkileşim amacıyla tasarlanmıştır.",
    body_style
))

# 2. Temel Mekanikler
story.append(Paragraph("2. Temel Oynanış & Fazlar (Phases)", h1_style))
story.append(Paragraph("<b>• Kara Modu (Run Mode):</b> Civciv zemin üzerindeki kaya ve kaktüs engellerinin üzerinden zıplayarak ilerler. Engellerin tepesinde risk/ödül mekaniği olarak tohumlar bulunur.", bullet_style))
story.append(Paragraph("<b>• Rampa & Boşluk Mekaniği:</b> Belirli aralıklarla çıkan rampa zıplama platformudur. Rampadan havalanıldığında zemin sona erer. Rampayı es geçen oyuncular boşluğa düşerek elenir.", bullet_style))
story.append(Paragraph("<b>• Uçuş Modu (Fly Mode):</b> Rampadan fırladıktan sonra Flappy Bird stili yerçekimi ve flap mekaniğine geçilir. GDG / AİBÜ logolu borular arasından süzülünür.", bullet_style))
story.append(Paragraph("<b>• Yumuşak Geçişler:</b> Uçuş fazı biterken zemin sağdan kayarak akıcı bir şekilde civcivin altına bağlanır, havada kalan tohumlar temizlenir.", bullet_style))

# 3. Skor & Tohum Sistemi
story.append(Paragraph("3. Skor & Tohum Dengeleme Sistemi", h1_style))
story.append(Paragraph(
    "Oyundaki rekabeti artırmak için net skor formülü yapılandırılmıştır: <b>Net Skor = Mesafe Skoru + Tohum Skoru</b>",
    body_style
))

score_data = [
    [Paragraph("<b>Parametre</b>", body_style), Paragraph("<b>Katsayı / Değer</b>", body_style), Paragraph("<b>Açıklama</b>", body_style)],
    [Paragraph("Mesafe Skoru", body_style), Paragraph("Kat edilen mesafe / 10", code_style), Paragraph("Her 10 piksel ilerleyiş 1 mesafe puanı kazandırır.", body_style)],
    [Paragraph("Tohum Puanı", body_style), Paragraph("Tohum başı +15 Puan", code_style), Paragraph("Her toplanan tohum net skora anında +15 puan ekler.", body_style)],
    [Paragraph("Yüzen Bildirim", body_style), Paragraph("+15 Efekti", code_style), Paragraph("Tohum alındığında retro sarı fontla yukarı süzülen yazı çıkar.", body_style)],
    [Paragraph("HUD Dağılımı", body_style), Paragraph("Net Skor | Mesafe | Tohum", code_style), Paragraph("Üst barda 3 bağımsız sütunda anlık gösterim yapılır.", body_style)]
]

t_score = Table(score_data, colWidths=[110, 140, 265])
t_score.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))
story.append(t_score)
story.append(Spacer(1, 8))

# 4. Hızlanma ve Performans Optimizasyonları
story.append(Paragraph("4. Google Dino Hız Eğrisi & 60Hz Akıcılık Optimizasyonu", h1_style))
story.append(Paragraph("<b>• Sürekli İvmelenme (ACCELERATION = 0.0018):</b> Google Chrome Dino'nun kaynak kodundaki model uygulanmıştır. Hız adım adım değil, hayatta kalınan her saniye yumuşakça 7.0'dan 14.5'e tırmanır.", bullet_style))
story.append(Paragraph("<b>• 100m Milestone / Faz Parlaması:</b> Her 100 metrede bir milestone zil sesi çalar, kıvılcımlar saçılır ve üst bardaki mesafe göstergesi altın renginde yanıp söner.", bullet_style))
story.append(Paragraph("<b>• VSync-Quantized Delta:</b> Windows DWM zamanlayıcı sapmaları 60Hz, 144Hz ve 165Hz monitörler için dar toleranslı filtreye bağlanarak mikro takılmalar (micro-stutter) sıfırlanmıştır.", bullet_style))
story.append(Paragraph("<b>• Integer Snapping:</b> Kamera, zemin ve engeller subpixel judder önlemek amacıyla piksel hizalı (Math.round) çizdirilmektedir.", bullet_style))

# 5. Liderlik Tablosu ve Güvenlik
story.append(Paragraph("5. Liderlik Tablosu & Admin Güvenliği", h1_style))
story.append(Paragraph("<b>• Günlük Sıralama:</b> LocalStorage tabanlı günün en yüksek ilk 10 net skoru saklanır ve IDLE ekranında listelenir.", bullet_style))
story.append(Paragraph("<b>• Küfür Filtresi:</b> Leetspeak ve harf tekrarı varyasyonlarını yakalayan filtre ile uygunsuz isimler rastgele <i>Civciv#XXX</i> olarak maskelenir.", bullet_style))
story.append(Paragraph("<b>• Gizli Admin Paneli:</b> <i>Ctrl + Shift + A</i> kısayolu ile açılan panelden gün sıfırlanabilir, münferit oyuncu silinebilir veya JSON/CSV dışa aktarılabilir.", bullet_style))

# 6. Proje Bağlantıları
story.append(Spacer(1, 6))
story.append(Paragraph("6. Depo & Kod Kaynağı", h1_style))
story.append(Paragraph("<b>GitHub Deposu:</b> <font color='#2563eb'><u>https://github.com/BugraKarayel/civciv-runner-prototip</u></font>", body_style))

doc.build(story)
print("PDF_GENERATED_SUCCESSFULLY")
