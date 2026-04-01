const workDetails = [
    {
        thumb: "https://i.ytimg.com/vi/aqZnrOnnyBA/maxresdefault.jpg",
        thumbAlt: "야당 쇼츠 썸네일",
        caption: "야 그게 뭐야?",
        likeCount: "1.3만",
        dislikeLabel: "싫어요",
        commentCount: "198",
        shareLabel: "공유",
        remixLabel: "리믹스",
        avatarText: "@",
        channel: "@지무비",
        subscribe: "구독",
        desc: "예매율 38% 미쳤다..유해진 주연의 <내부자들",
        headline: "와.. 연기 개 미쳤다..",
        pivotThumb: "https://yt3.ggpht.com/7Tnxb_PQu3oLQj1IYv3IJ3rv_S4YyyqY3fazd4yCg_kePd9DKalomOPIz6DBR-l_ItHyPHF6Pko=s48-c-k-c0x00ffffff-no-rj"
    },
    {
        thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        thumbAlt: "미디어 아트 썸네일",
        caption: "빛이 움직인다",
        likeCount: "8,421",
        dislikeLabel: "싫어요",
        commentCount: "57",
        shareLabel: "공유",
        remixLabel: "리믹스",
        avatarText: "A",
        channel: "@artflux",
        subscribe: "구독",
        desc: "설치 미술 전시장 안에서 빛과 사운드가 같이 반응하는 순간",
        headline: "공간 전체가 작품이 되는 연출",
        pivotThumb: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=200&q=80"
    },
    {
        thumb: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        thumbAlt: "인터뷰 영상 썸네일",
        caption: "작업실 비하인드",
        likeCount: "2,903",
        dislikeLabel: "싫어요",
        commentCount: "34",
        shareLabel: "공유",
        remixLabel: "리믹스",
        avatarText: "S",
        channel: "@studioframe",
        subscribe: "구독",
        desc: "작가가 직접 설명하는 제작 과정과 재료 선택 이야기",
        headline: "작업실에서 바로 듣는 제작 비하인드",
        pivotThumb: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=200&q=80"
    }
];

const playIconPath = "M7 5.2v13.6c0 .73.8 1.18 1.43.8L19.98 13a.92.92 0 0 0 0-1.6L8.43 4.4A.92.92 0 0 0 7 5.2Z";
const pauseIconPath = "M6.5 3A1.5 1.5 0 005 4.5v15A1.5 1.5 0 006.5 21h2a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 008.5 3h-2Zm9 0A1.5 1.5 0 0014 4.5v15a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0017.5 3h-2Z";

const pageStack = document.getElementById("page-stack");
const workPageTemplate = document.getElementById("work-page-template");

function bindPageData(page, data) {
    Object.entries(data).forEach(([key, value]) => {
        page.querySelectorAll(`[data-field="${key}"]`).forEach((node) => {
            if (node.tagName === "IMG") {
                node.src = value;
                if (key === "thumb") {
                    node.alt = data.thumbAlt || "";
                }
                return;
            }

            node.textContent = value;
        });
    });

    page.querySelectorAll("[data-action-label]").forEach((button) => {
        const text = button.querySelector("[data-field]")?.textContent?.trim();
        if (text) {
            button.setAttribute("aria-label", text);
        }
    });
}

function bindPageInteractions(page) {
    const playToggle = page.querySelector('[data-role="play-toggle"]');
    const playTogglePath = page.querySelector('[data-role="play-toggle-path"]');
    const moreButton = page.querySelector('[data-role="more-button"]');
    const moreMenu = page.querySelector('[data-role="more-menu"]');
    const card = page.querySelector(".card");

    if (playToggle && playTogglePath) {
        let isPaused = false;

        playToggle.addEventListener("click", () => {
            isPaused = !isPaused;
            playTogglePath.setAttribute("d", isPaused ? pauseIconPath : playIconPath);
            playToggle.setAttribute("aria-label", isPaused ? "일시정지" : "재생");
        });
    }

    if (moreButton && moreMenu && card) {
        const positionMenu = () => {
            const buttonRect = moreButton.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();

            moreMenu.style.left = `${buttonRect.right - cardRect.left + 10}px`;
            moreMenu.style.top = `${buttonRect.top - cardRect.top}px`;
        };

        const closeMenu = () => {
            moreMenu.hidden = true;
            moreButton.setAttribute("aria-expanded", "false");
        };

        moreButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const willOpen = moreMenu.hidden;
            moreMenu.hidden = !willOpen;
            moreButton.setAttribute("aria-expanded", willOpen ? "true" : "false");
            if (willOpen) {
                positionMenu();
            }
        });

        moreMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        document.addEventListener("click", (event) => {
            if (!moreMenu.hidden && !moreMenu.contains(event.target) && !moreButton.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (!moreMenu.hidden) {
                positionMenu();
            }
        });
    }
}

if (pageStack && workPageTemplate) {
    workDetails.forEach((data) => {
        const fragment = workPageTemplate.content.cloneNode(true);
        const page = fragment.querySelector(".page");

        bindPageData(page, data);
        bindPageInteractions(page);
        pageStack.appendChild(fragment);
    });
}
