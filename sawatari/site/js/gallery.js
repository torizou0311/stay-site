/* 写真の拡大表示（JSがなくても、リンクから画像は開けます） */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".gallery a"));
  if (!links.length || typeof HTMLDialogElement === "undefined") return;
  var dlg = document.createElement("dialog");
  dlg.className = "lb";
  dlg.innerHTML = '<div class="stage"><img alt=""></div>' +
    '<button class="x" type="button" aria-label="Close">×</button>' +
    '<button class="p" type="button" aria-label="Prev">‹</button>' +
    '<button class="n" type="button" aria-label="Next">›</button>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector("img"), cur = 0;
  function show(i) {
    cur = (i + links.length) % links.length;
    var a = links[cur];
    img.src = a.getAttribute("href");
    img.alt = a.querySelector("img").alt;
  }
  links.forEach(function (a, i) {
    a.addEventListener("click", function (e) { e.preventDefault(); show(i); dlg.showModal(); });
  });
  dlg.querySelector(".x").onclick = function () { dlg.close(); };
  dlg.querySelector(".p").onclick = function () { show(cur - 1); };
  dlg.querySelector(".n").onclick = function () { show(cur + 1); };
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg || e.target.className === "stage") dlg.close();
  });
  document.addEventListener("keydown", function (e) {
    if (!dlg.open) return;
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
})();
