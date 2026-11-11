"""
포트폴리오 이미지 최적화 스크립트

원본 사진 폴더를 받아 웹용 WebP 이미지(800px / 1600px)를 만듭니다.
- 휴대폰 사진의 회전 정보(EXIF)를 반영해 바르게 세웁니다.
- 위치정보 등 메타데이터는 모두 제거됩니다.

사용법:
    pip install Pillow
    python3 scripts/optimize-images.py <원본폴더> <출력폴더> <파일이름접두어>

예시:
    python3 scripts/optimize-images.py ~/사진/office assets/images/portfolio/office office
    -> office-01-800.webp, office-01-1600.webp, office-02-800.webp ...

원본 폴더 안 파일은 이름순으로 정렬해 01, 02 ... 번호를 붙입니다.
순서를 바꾸고 싶으면 원본 파일 이름 앞에 01_, 02_ 처럼 번호를 붙여 두세요.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

SIZES = (800, 1600)  # 긴 변 기준 최대 픽셀
QUALITY = 80
EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def main(src: Path, out: Path, prefix: str) -> None:
    out.mkdir(parents=True, exist_ok=True)
    files = sorted(p for p in src.iterdir() if p.suffix.lower() in EXTS)
    for i, path in enumerate(files, 1):
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            for size in SIZES:
                copy = im.copy()
                copy.thumbnail((size, size), Image.LANCZOS)
                name = f"{prefix}-{i:02d}-{size}.webp"
                copy.save(out / name, "WEBP", quality=QUALITY, method=6)
            print(f"{path.name} -> {prefix}-{i:02d}  ({im.width}x{im.height})")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(__doc__)
        sys.exit(1)
    main(Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3])
