// ==UserScript==
// @name         PNT Bypass Tool (v2)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Vượt link Yeumoney/Link4m với giao diện đẹp, thông báo rõ lỗi hoặc link mặc định Telegram
// @author       PNT
// @match        *://yeumoney.com/*
// @match        *://link4m.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createUI() {
        const btn = document.createElement("button");
        btn.innerText = "🚀 Bypass PNT";
        Object.assign(btn.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            padding: "10px 20px",
            background: "#00ffaa",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            fontFamily: "Arial"
        });

        btn.onclick = async () => {
            btn.disabled = true;
            btn.innerText = "⏳ Đang xử lý...";
            try {
                const res = await fetch(location.href, { redirect: "follow" });
                const finalUrl = res.url;

                if (finalUrl.includes("t.me/yeumoney")) {
                    alert("⚠️ Yeumoney đã chặn bypass. Link trả về mặc định: " + finalUrl);
                } else if (finalUrl === location.href) {
                    alert("❌ Không tìm thấy link cuối (link không redirect)");
                } else {
                    alert("✅ Link cuối: " + finalUrl);
                    window.open(finalUrl, "_blank");
                }
            } catch (e) {
                alert("❌ Lỗi khi vượt link: " + e.message);
            } finally {
                btn.disabled = false;
                btn.innerText = "🚀 Bypass PNT";
            }
        };

        document.body.appendChild(btn);
    }

    window.addEventListener("load", () => {
        setTimeout(createUI, 1500);
    });
})();
