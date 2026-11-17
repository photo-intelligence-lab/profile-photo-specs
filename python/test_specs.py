from profile_photo_specs import SPECS, get, export_size, check, by_category


def test_all():
    assert len(SPECS) >= 25
    assert export_size("linkedin")["width"] == 400
    assert get("LinkedIn")["name"] == "LinkedIn"
    assert len(by_category("passport")) >= 5
    assert check("linkedin", width=800, height=800, bytes=200000, format="jpg")["ok"]
    r = check("linkedin", width=300, height=200, bytes=9 * 1024 * 1024, format="gif")
    assert len(r["issues"]) == 5


if __name__ == "__main__":
    test_all()
    print("ok")
