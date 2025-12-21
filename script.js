(function () {
  const bookShell = document.getElementById("bookShell");
  const bookCover = document.getElementById("bookCover");
  const bookFrame = document.getElementById("bookFrame");
  const pageLeft = document.getElementById("pageLeft");
  const pageRightContainer = document.getElementById("pageRightContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageStatus = document.getElementById("pageStatus");
  const audioToggle = document.getElementById("audioToggle");
  const bgMusic = document.getElementById("bgMusic");

  let currentPage = 0;
  let soundEnabled = true;
  let isFlipping = false;

  const spreads = [
    [
      `<div class="blank-page"></div>`,
      `<div class="title-block" style="text-align: center; margin-top: 4rem;">
          <h1>The Five<br />Chapters of You</h1>
          <h2>By Paul</h2>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 1</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="page-header">About the Author</div>
        <div class="section-title">Paul</div>
        <div class="divider"></div>
        <div class="author-box">
          <h3>Who is Paul?</h3>
          <p>
            Paul is someone who won't rush you or pressure you. He's the kind of person who chooses you with intention and gentleness.
          </p>
        </div>
        <div class="body-text">
          <p>
            This book is his way of sharing the things he genuinely wants you to know. He created it because some feelings deserve to be expressed softly, and this is his way of showing how much you matter to him–in the most honest and heartfelt way he knows.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 2</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="page-header">For Azalea</div>
        <div class="section-title">Dedication</div>
        <div class="divider"></div>
        <div class="dedication-box">
          <h3>This book is for Azalea</h3>
          <p>
            For the girl whose quiet presence brings warmth, and whose gentle spirit makes the world feel a little softer.
          </p>
        </div>
        <div class="body-text" style="margin-top: 1.5rem;">
          <p>
            May these pages be a small reminder that your light doesn't go unnoticed—that the way you care, the way you listen, and the way you move through the world with kindness truly matters.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 3</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="page-header">Foreword</div>
        <div class="section-title">Before we begin</div>
        <div class="divider"></div>
        <div class="body-text">
          <p>
            Books are usually written to tell a story. This one is different. It doesn't try to capture every detail of who you are, Azalea. Instead, it's a quiet and gentle way of appreciating the little things that make you unique.
          </p>
          <p style="margin-top: 1rem;">
            A few of your friends also wanted to say something:
          </p>
        </div>
        <div class="friends-quote" style="margin-top: 0.8rem;">
          <p>choose happiness and peace always. i love you‚ i'll support you no matter what.<span class="quote-attribution">— Hashi</span></p>
          <p>you are stronger than you think‚ braver than you believe.<span class="quote-attribution">— Nobyembre</span></p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 4</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="friends-quote" style="margin-top: 0.5rem;">
          <p>i hope life gives back to you everything you've quietly given away without expecting anything in return : D<span class="quote-attribution">— Astraea</span></p>
          <p>hello, ate aza : D thank you for being one of the coolest and most precious people i've met this year. i hope you keep doing what you want but not forgetting to rest, i love you big time!<span class="quote-attribution">— Sunrise</span></p>
          <p>"The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged" (Deut. 31:8, NIV).<span class="quote-attribution">— Candy</span></p>
          <p>hello, my Aza! I hope you know that you're valued, not just for what you do, but for who you are po. you're thoughtful, genuine, and strong in ways you probably don't even notice. you deserve people who treat you with the same kindness and sincerity you give to others. i'll always be here for you, my Aza, in the best days and even in the heavy ones : )<span class="quote-attribution">— Alinéa</span></p>

        </div>
        <div class="page-footer">
          <span class="page-num">Page 5</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="friends-quote" style="margin-top: 2rem;">
          <p>Thank you for existing, for bringing joy to our lives... I hope you don't overwork yourself — and i hope you know that i'll always be here for you, to support you. I hope you know how much I appreciate you — thank you for checking on us despite your busy schedules, thank you for supporting us, and for giving us so much love... you are truly one of the most genuine person i ever met. I love you from the bottom of my heart, ate Aza.<span class="quote-attribution">— Cressaria</span></p>
        </div>
        <div class="body-text" style="margin-top: 0.8rem;">
          <p>
            We all hope this book reminds you of how much you are appreciated and loved. More than the words on these pages.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 6</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="page-header">Navigation</div>
        <div class="section-title">Table of Contents</div>
        <div class="divider"></div>
        <ul class="toc-list">
          <li class="toc-item" data-target="4">
            <span class="toc-left">
              <span class="toc-title-text">You, as a Comfort</span>
            </span>
            <span class="toc-page">Page 8</span>
          </li>
          <li class="toc-item" data-target="5">
            <span class="toc-left">
              <span class="toc-title-text">Your Strength</span>
            </span>
            <span class="toc-page">Page 10</span>
          </li>
          <li class="toc-item" data-target="6">
            <span class="toc-left">
              <span class="toc-title-text">Your Humor</span>
            </span>
            <span class="toc-page">Page 12</span>
          </li>
          <li class="toc-item" data-target="7">
            <span class="toc-left">
              <span class="toc-title-text">Your Heart</span>
            </span>
            <span class="toc-page">Page 14</span>
          </li>
          <li class="toc-item" data-target="8">
            <span class="toc-left">
              <span class="toc-title-text">You, as a Whole</span>
            </span>
            <span class="toc-page">Page 16</span>
          </li>
          <li class="toc-item" data-target="9">
            <span class="toc-left">
              <span class="toc-title-text">Bonus Chapter</span>
            </span>
            <span class="toc-page">Page 18</span>
          </li>
        </ul>
        <div class="page-footer">
          <span class="page-num">Page 7</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="chapter-number">Chapter 1</div>
        <h2 class="chapter-title">You, as a Comfort</h2>
        <p class="chapter-subtitle">Where your presence feels like home</p>
        <div class="divider"></div>
        <div class="body-text">
          <p>
            my Azalea, your presence brings comfort not just to me but for the people you treasure the most here—your friends. I'm out of words on how you make us feel safety, on how you make us all feel loved and seen.
          </p>
          <p>
            And honestly, not everyone can do that. Not everyone can make a room feel lighter just by being in it. But you do. You make people feel understood, accepted, and held without even trying.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 8</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="body-text" style="margin-top: 2.6rem;">
          <p>
            I hope you never underestimate how comforting you are to the people around you—including me. Your presence feels like home.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 9</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="chapter-number">Chapter 2</div>
        <h2 class="chapter-title">Your Strength</h2>
        <p class="chapter-subtitle">How you keep going, even when it's hard</p>
        <div class="divider"></div>
        <div class="body-text">
          <p>
            I hope you see how strong you really are, Aza. Kasi you're always reminding people that they're strong, that they matter, that they can keep going—and yet, you keep going too. You keep showing up, focusing on what matters, pushing through even when it's tough, even when you're tired, even when you barely get sleep… I truly admire how you handle everything with such grace.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 10</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="body-text" style="margin-top: 2.6rem;">
          <p>
            When the world feels overwhelming, I hope you remember it's okay to pause. Alam ko minsan nakakalimutan mo magpahinga or alagaan sarili mo kasi determined ka tapusin lahat ng sinimulan mo. But please, give yourself the space to breathe kasi deserve mo rin yon. You can rest and still be the amazing and strong person you are.
          </p>
          <p>
            I'm always proud of you, my Azalea :)
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 11</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="chapter-number">Chapter 3</div>
        <h2 class="chapter-title">Your Humor</h2>
        <p class="chapter-subtitle">The side of you that only comes out with me</p>
        <div class="divider"></div>
        <div class="body-text">
          <p>
            It's funny na despite your softness at how seryoso ka usually sa group page, you still have this extra kulit side na lumalabas lang kapag magkausap tayo.
          </p>
          <p>
            Sometimes I catch myself smiling tapos nahihirapan pa akong itago kapag biglang pumasok si mom sa room ko hahaha.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 12</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="body-text" style="margin-top: 2.6rem;">
          <p>
            I love that it exists and I love na I get to see it. Feeling ko sobrang lucky and special ko na I get to see it.
          </p>
          <p>
            P.S. Hello Mhie Ko
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 13</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="chapter-number">Chapter 4</div>
        <h2 class="chapter-title">Your Heart</h2>
        <p class="chapter-subtitle">The goodness in everything you do</p>
        <div class="divider"></div>
        <div class="body-text">
          <p>
            What makes your kindness special is how consistent it is. You don't choose who deserves it—you offer it freely, gently, without expecting anything in return. It's the kind of kindness that makes people feel seen, the kind that softens even the heaviest days.
          </p>
          <p>
            It's no wonder people feel safe around you. And anyone who gets to experience that part of you is way more blessed than they even realize.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 14</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="body-text" style="margin-top: 2.6rem;">
          <p>
            You probably don't notice how many people breathe easier kasi andito ka, how many feel lighter kasi you actually listen, and how many feel seen just because of your kindness.
          </p>
          <p>
            Someone like you makes the world kinder just by being in it.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 15</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="chapter-number">Chapter 5</div>
        <h2 class="chapter-title">You, as a Whole</h2>
        <p class="chapter-subtitle">All the parts that make you, you</p>
        <div class="divider"></div>
        <div class="body-text">
          <p>
            When I think about you, I see all of you—your warmth, your strength, your gentleness, your kindness, your humor, your intelligence.
          </p>
          <p>
            I want you to know that you are enough, just as you are. You matter. You are loved. You are worthy of all the care, admiration, and happiness the world has to offer.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 16</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="body-text" style="margin-top: 2.6rem;">
          <p>
            I'm grateful for who you are now, and for the amazing person you're still becoming.
          </p>
          <p>
            You are a whole story, a collection of beautiful chapters, and I hope I get the chance to read every single page.
          </p>
          <p style="margin-top: 1rem;">
            So, thank you for existing.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 17</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="chapter-number">Bonus Chapter</div>
        <h2 class="chapter-title">A Question</h2>
        <p class="chapter-subtitle">Something I need to ask</p>
        <div class="divider"></div>
        <div class="body-text">
          <p>
            Hello,
          </p>
          <p>
            Matagal ko na itong iniisip. Honestly, ang dami kong gustong sabihin pero hindi ko alam kung saan magsisimula. Words have always been my weakness kaya ginawa ko na lang ito para maipakita nang sincere kung ano talaga ang nararamdaman ko. Sorry na kung medyo cheesy o corny at magulo pero sana ramdam mo yung honesty sa bawat words na nakalagay dito.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 18</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="body-text" style="margin-top: 2rem;">
          <p>
            You once told me na natatakot ka mag-take ng risks kasi baka masaktan ka. I get it but softly and honestly, I want you to know: I'm worth the risk. Not because I'm perfect, but because I choose you with intention.
          </p>
          <p>
            I can't promise there won't be hard days pero I can promise I'll be here and will keep choosing you every single time. I'll show up with patience, gentleness, and honesty. I'll listen. I'll stay. I'll choose you in ways that make you feel safe. I want to be someone you can truly trust—your friend, your safe place, your partner, or whatever feels right for you.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 19</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
    [
      `<div class="body-text" style="margin-top: 2rem;">
          <p>
            I know you'll be gone for months after Christmas break but please don't worry that pagbalik mo na baka wala na ako. Aza, I'll wait. Kahit gaano katagal. Pagbalik mo, I'll still be here—still waiting for you, still silently yearning for you, still choosing you, still proud of you. You won't come back para sa wala lang; you'll come back to someone who stayed.
          </p>
          <p>
            And I don't want a perfect version of you. I want to know you—the good days, the heavy days, the quiet hours, even the unwritten pages of your story. I want to know you as you are, and as you're becoming.
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 20</span>
          <span class="signature">Paul</span>
        </div>`,
      `<div class="body-text" style="margin-top: 2rem;">
          <p>
            And if you'll let me…
          </p>
          <p>
            I'd love to be part of your story.<br>
            Slowly. Softly. One chapter at a time.
          </p>
          <p style="margin-top: 2rem;">
            So…<br>
            In the most honest and gentle way I can say this,
          </p>
          <p style="margin-top: 1rem; font-weight: 700; font-size: 1.05rem;">
            May I court you?
          </p>
        </div>
        <div class="page-footer">
          <span class="page-num">Page 21</span>
          <span class="signature">Paul</span>
        </div>`,
    ],
  ];

  const totalSpreads = spreads.length;

  function initializePages() {
    pageRightContainer.innerHTML = "";

    spreads.forEach((spread, index) => {
      const pageEl = document.createElement("div");
      pageEl.className = "page";
      pageEl.innerHTML = spread[1];
      pageEl.dataset.index = index;

      if (index === 0) {
        pageEl.classList.add("visible");
      } else {
        pageEl.classList.add("hidden");
      }

      pageRightContainer.appendChild(pageEl);
    });

    attachTocListeners();
    updateLeftPage(0);
    updateStatus();
  }

  function updateLeftPage(index) {
    if (spreads[index] && spreads[index][0]) {
      pageLeft.innerHTML = spreads[index][0];
    } else {
      pageLeft.innerHTML = '<div class="blank-page"></div>';
    }
  }

  function attachTocListeners() {
    const tocItems = document.querySelectorAll(".toc-item");
    tocItems.forEach((item) => {
      const target = Number(item.getAttribute("data-target"));
      item.onclick = () => {
        if (!isFlipping) goToPage(target);
      };
    });
  }

  function updateStatus() {
    const displayPage = currentPage * 2 + 1;
    const totalPages = totalSpreads * 2;
    pageStatus.textContent = `Pages ${displayPage}-${
      displayPage + 1
    } of ${totalPages}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalSpreads - 1;
  }

  function goToPage(targetIndex) {
    if (
      targetIndex === currentPage ||
      targetIndex < 0 ||
      targetIndex >= totalSpreads ||
      isFlipping
    )
      return;

    isFlipping = true;
    const allPages = pageRightContainer.querySelectorAll(".page");
    const forward = targetIndex > currentPage;

    if (forward) {
      const currentPageEl = allPages[currentPage];
      const targetPageEl = allPages[targetIndex];

      targetPageEl.classList.remove("hidden", "flipped");
      targetPageEl.style.display = "flex";

      requestAnimationFrame(() => {
        currentPageEl.classList.remove("visible");
        currentPageEl.classList.add("flipping-forward");

        setTimeout(() => updateLeftPage(targetIndex), 350);

        setTimeout(() => {
          currentPageEl.classList.remove("flipping-forward");
          currentPageEl.classList.add("flipped", "hidden");
          targetPageEl.classList.add("visible");

          currentPage = targetIndex;
          updateStatus();
          attachTocListeners();
          isFlipping = false;
        }, 700);
      });
    } else {
      const currentPageEl = allPages[currentPage];
      const targetPageEl = allPages[targetIndex];

      currentPageEl.classList.remove("visible");
      currentPageEl.classList.add("hidden");

      targetPageEl.classList.remove("hidden");
      targetPageEl.classList.add("flipped");
      targetPageEl.style.display = "flex";

      requestAnimationFrame(() => {
        targetPageEl.classList.remove("flipped");
        targetPageEl.classList.add("visible");

        setTimeout(() => updateLeftPage(targetIndex), 350);

        setTimeout(() => {
          currentPage = targetIndex;
          updateStatus();
          attachTocListeners();
          isFlipping = false;
        }, 700);
      });
    }
  }

  function nextPage() {
    if (currentPage < totalSpreads - 1 && !isFlipping)
      goToPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 0 && !isFlipping) goToPage(currentPage - 1);
  }

  bookCover.addEventListener("click", () => {
    bookShell.classList.add("opened");
    initializePages();

    if (soundEnabled) {
      bgMusic.volume = 0.3;
      bgMusic
        .play()
        .then(() => {
          audioToggle.classList.add("active");
        })
        .catch((err) => {
          console.log("Autoplay blocked, user must interact first");
        });
    }
  });

  nextBtn.addEventListener("click", nextPage);
  prevBtn.addEventListener("click", prevPage);

  document.addEventListener("keydown", (e) => {
    if (!bookShell.classList.contains("opened")) return;
    if (e.key === "ArrowRight") nextPage();
    else if (e.key === "ArrowLeft") prevPage();
  });

  audioToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    audioToggle.classList.toggle("active", soundEnabled);
    audioToggle.setAttribute("aria-pressed", String(soundEnabled));

    if (soundEnabled) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(() => {});
    } else {
      bgMusic.pause();
    }
  });

  let touchStartX = null;
  document.addEventListener(
    "touchstart",
    (e) => {
      if (!bookShell.classList.contains("opened")) return;
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      if (!bookShell.classList.contains("opened") || touchStartX === null)
        return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) nextPage();
        else prevPage();
      }
      touchStartX = null;
    },
    { passive: true }
  );
})();
