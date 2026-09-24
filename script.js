/* =========================================================
   CASH INU
   WEBSITE CONFIGURATION
========================================================= */

const CASHINU = {

    /*
     * =====================================================
     * SMART CONTRACT
     * =====================================================
     *
     * TULIS SMART CONTRACT HANYA DI SINI.
     *
     * Jangan menulis contract address lagi di HTML
     * atau di bagian JavaScript lainnya.
     */

    CONTRACT_ADDRESS:
        "0x0",


    /*
     * =====================================================
     * TOKENOMICS
     * =====================================================
     */

    TOKENOMICS: {

        TOTAL_SUPPLY:
            "1,000,000,000",

        BUY_TAX:
            "0%",

        SELL_TAX:
            "0%",

        TICKER:
            "$CASHINU"

    }

};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeTokenomics();

        initializeCopyButton();

        initializeScrollReveal();

        initializeScrollProgress();

        initializeNavigation();

        initializeParallax();

    }
);


/* =========================================================
   TOKENOMICS
========================================================= */

function initializeTokenomics() {

    const supply =
        document.getElementById(
            "totalSupply"
        );

    const buyTax =
        document.getElementById(
            "buyTax"
        );

    const sellTax =
        document.getElementById(
            "sellTax"
        );

    const ticker =
        document.getElementById(
            "ticker"
        );


    if (supply) {

        supply.textContent =
            CASHINU.TOKENOMICS.TOTAL_SUPPLY;

    }


    if (buyTax) {

        buyTax.textContent =
            CASHINU.TOKENOMICS.BUY_TAX;

    }


    if (sellTax) {

        sellTax.textContent =
            CASHINU.TOKENOMICS.SELL_TAX;

    }


    if (ticker) {

        ticker.textContent =
            CASHINU.TOKENOMICS.TICKER;

    }


    /*
     * =====================================================
     * SMART CONTRACT DISPLAY
     * =====================================================
     */

    const address =
        document.getElementById(
            "contractAddress"
        );


    if (address) {

        address.textContent =
            CASHINU.CONTRACT_ADDRESS;

    }


    /*
     * =====================================================
     * PONS FAMILY
     * =====================================================
     */

    const pons =
        document.getElementById(
            "ponsButton"
        );


    if (pons) {

        pons.href =
            `https://www.ponsfamily.com/launchpad/${CASHINU.CONTRACT_ADDRESS}`;

    }


    /*
     * =====================================================
     * UNISWAP
     * =====================================================
     */

    const uniswap =
        document.getElementById(
            "uniswapButton"
        );


    if (uniswap) {

        uniswap.href =
            `https://app.uniswap.org/swap?chain=robinhood&outputCurrency=${CASHINU.CONTRACT_ADDRESS}`;

    }

}


/* =========================================================
   COPY SMART CONTRACT
========================================================= */

function initializeCopyButton() {

    const button =
        document.getElementById(
            "copyContract"
        );

    const addressElement =
        document.getElementById(
            "contractAddress"
        );


    if (
        !button ||
        !addressElement
    ) {

        return;

    }


    /*
     * Hindari event listener ganda
     * jika fungsi dipanggil ulang.
     */

    if (
        button.dataset.copyInitialized === "true"
    ) {

        return;

    }


    button.dataset.copyInitialized =
        "true";


    button.addEventListener(
        "click",
        async () => {

            /*
             * =================================================
             * SATU-SATUNYA SUMBER SMART CONTRACT
             * =================================================
             */

            const address =
                CASHINU.CONTRACT_ADDRESS.trim();


            /*
             * CA belum diisi.
             */

            if (!address) {

                button.textContent =
                    "SET CA FIRST";


                setTimeout(
                    () => {

                        button.textContent =
                            "COPY";

                    },
                    1500
                );


                return;

            }


            /*
             * =================================================
             * METHOD 1
             * Modern Clipboard API
             * =================================================
             */

            try {

                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    await navigator.clipboard.writeText(
                        address
                    );


                    showCopySuccess(
                        button
                    );


                    return;

                }

            } catch (error) {

                console.warn(
                    "Clipboard API failed. Trying fallback...",
                    error
                );

            }


            /*
             * =================================================
             * METHOD 2
             * Fallback untuk local / insecure context
             * =================================================
             */

            try {

                const textarea =
                    document.createElement(
                        "textarea"
                    );


                textarea.value =
                    address;


                textarea.style.position =
                    "fixed";

                textarea.style.left =
                    "-9999px";

                textarea.style.top =
                    "0";

                textarea.style.opacity =
                    "0";


                document.body.appendChild(
                    textarea
                );


                textarea.focus();

                textarea.select();

                textarea.setSelectionRange(
                    0,
                    textarea.value.length
                );


                const copied =
                    document.execCommand(
                        "copy"
                    );


                document.body.removeChild(
                    textarea
                );


                if (!copied) {

                    throw new Error(
                        "Fallback copy failed"
                    );

                }


                showCopySuccess(
                    button
                );


            } catch (error) {

                console.error(
                    "Smart contract copy failed:",
                    error
                );


                button.textContent =
                    "FAILED";


                setTimeout(
                    () => {

                        button.textContent =
                            "COPY";

                    },
                    1600
                );

            }

        }
    );

}


/* =========================================================
   COPY SUCCESS STATE
========================================================= */

function showCopySuccess(button) {

    button.textContent =
        "COPIED!";


    setTimeout(
        () => {

            button.textContent =
                "COPY";

        },
        1600
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const scenes =
        document.querySelectorAll(
            ".scene"
        );


    if (
        !scenes.length
    ) {

        return;

    }


    /*
     * Browser tidak mendukung IntersectionObserver.
     * Tampilkan semua scene.
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        scenes.forEach(
            (scene) => {

                scene.classList.add(
                    "visible"
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    scenes.forEach(
        (scene) => {

            observer.observe(
                scene
            );

        }
    );

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initializeScrollProgress() {

    const progress =
        document.querySelector(
            ".scroll-progress span"
        );


    if (!progress) {

        return;

    }


    function updateProgress() {

        const scrollTop =
            window.scrollY;


        const height =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;


        progress.style.width =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateProgress
    );


    updateProgress();

}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const links =
        document.querySelectorAll(
            ".site-nav nav a"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (
        !links.length ||
        !sections.length
    ) {

        return;

    }


    /*
     * Smooth scroll.
     */

    links.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        !href.startsWith("#")
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


    /*
     * Active navigation item.
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        links.forEach(
                            (link) => {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const active =
                            document.querySelector(
                                `.site-nav nav a[href="#${entry.target.id}"]`
                            );


                        if (active) {

                            active.classList.add(
                                "active"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.55
            }
        );


    sections.forEach(
        (section) => {

            observer.observe(
                section
            );

        }
    );

}


/* =========================================================
   SUBTLE PARALLAX
========================================================= */

function initializeParallax() {

    const scenes =
        document.querySelectorAll(
            ".scene"
        );


    if (
        !scenes.length
    ) {

        return;

    }


    /*
     * Respect reduced motion.
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    /*
     * Jangan jalankan parallax pada perangkat
     * yang menggunakan coarse pointer.
     */

    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (isTouchDevice) {

        return;

    }


    let ticking =
        false;


    function updateParallax() {

        scenes.forEach(
            (scene) => {

                const rect =
                    scene.getBoundingClientRect();


                const image =
                    scene.querySelector(
                        ".scene-bg"
                    );


                if (!image) {

                    return;

                }


                const center =
                    window.innerHeight / 2;


                const distance =
                    rect.top +
                    rect.height / 2 -
                    center;


                if (
                    Math.abs(distance) <
                    window.innerHeight * 1.2
                ) {

                    const offset =
                        distance * -0.025;


                    image.style.transform =
                        `scale(1.025) translateY(${offset}px)`;

                }

            }
        );


        ticking =
            false;

    }


    function requestParallaxUpdate() {

        if (ticking) {

            return;

        }


        ticking =
            true;


        window.requestAnimationFrame(
            updateParallax
        );

    }


    window.addEventListener(
        "scroll",
        requestParallaxUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        requestParallaxUpdate
    );


    updateParallax();

}


/* =========================================================
   KEYBOARD SHORTCUT
   Press "B" -> scroll to TOKENOMICS / BUY section
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Jangan aktif ketika user sedang mengetik.
         */

        const tag =
            document.activeElement?.tagName;


        if (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT"
        ) {

            return;

        }


        if (
            event.key.toLowerCase() === "b"
        ) {

            document
                .getElementById(
                    "tokenomics"
                )
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }

    }
);