/* ==========================================
   EJAY GRFX PORTFOLIO
========================================== */


/* ==========================================
   THEME TOGGLE
========================================== */

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    themeToggle.textContent = isLight ? "☾" : "☼";

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

});


/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ==========================================
   SKILL BARS
========================================== */

const skillBars = document.querySelectorAll(".skill-bar span");

const skillObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const width =
                    entry.target.dataset.width;

                entry.target.style.width = width;

                skillObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.5
    }
);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* ==========================================
   WORK FILTERS
========================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const workCards =
    document.querySelectorAll(".work-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        workCards.forEach(card => {

            const category =
                card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* ==========================================
   PROJECT DATA
========================================== */

/*
    Dito mo ilalagay ang actual images
    ng bawat project.

    Example:

    "works/mpbl-1.jpg"

    Make sure EXACT ang filename.
*/

const projects = {

    mpbl: {

        title: "GAME DAY",

        category: "SPORTS / MPBL",

        description:
            "Game day graphics created for Meycauayan–Marilao Gems in the Maharlika Pilipinas Basketball League.",

        images: [

            "works/1.png",
            "works/2.png",
            "works/3.png",
            "works/4.png",
            "works/countdown-4.jpg",
            "works/countdown-3.jpg",
            "works/countdown-2.jpg",
            "works/countdown-1.jpg",

        ]

    },


    bestplayer: {

        title: "BEST PLAYER",

        category: "SPORTS / PLAYER GRAPHICS",

        description:
            "Player recognition graphics created for game results and Best Player features.",

        images: [

            "works/M1.png",
            "works/M2.png",
            "works/M3.png",
            "works/M4.png",
            "works/M5.png",

        ]

    },


    posters: {

        title: "PLAYER GRAPHICS",

        category: "SPORTS / POSTERS",

        description:
            "Selected player posters and sports graphics created for basketball content.",

        images: [

            "works/poster-1.jpg",
            "works/poster-2.jpg"

        ]

    },


    social: {

        title: "PUBMATS",

        category: "SOCIAL MEDIA",

        description:
            "Social media pubmats and announcement graphics created for organizations and digital platforms.",

        images: [

            "works/pubmat-1.jpg",
            "works/pubmat-2.jpg",
            "works/pubmat-3.jpg"

        ]

    },


    branding: {

        title: "BRAND DESIGNS",

        category: "BRANDING",

        description:
            "Selected branding, logo, shirt, jersey, and visual identity projects.",

        images: [

            "works/branding-1.jpg",
            "works/branding-2.jpg"

        ]

    },

    logo: {
    title: "IMAGE WORKS",

    category: "IMAGE",

    description:
        "Selected image manipulation and creative visual projects.",

    images: [
        "works/image-1.jpg",
        "works/image-2.jpg",
        "works/image-3.jpg",
        "works/image-4.jpg"
    ]
}

};


/* ==========================================
   PROJECT MODAL
========================================== */

const projectModal =
    document.getElementById("projectModal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");

const galleryMainImage =
    document.getElementById("galleryMainImage");

const galleryThumbnails =
    document.getElementById("galleryThumbnails");

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");

const currentImage =
    document.getElementById("currentImage");

const totalImages =
    document.getElementById("totalImages");


let currentProject = null;
let currentIndex = 0;


/* ==========================================
   OPEN PROJECT
========================================== */

workCards.forEach(card => {

    card.addEventListener("click", () => {

        const projectName =
            card.dataset.project;

        openProject(projectName);

    });

});


function openProject(projectName) {

    const project =
        projects[projectName];

    if (!project) return;

    currentProject = project;
    currentIndex = 0;

    modalTitle.textContent =
        project.title;

    modalCategory.textContent =
        project.category;

    modalDescription.textContent =
        project.description;

    totalImages.textContent =
        String(project.images.length)
            .padStart(2, "0");

    createThumbnails();

    updateGallery();

    projectModal.classList.add("active");

    document.body.classList.add("modal-open");

}


/* ==========================================
   CLOSE PROJECT
========================================== */

function closeProject() {

    projectModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}

modalClose.addEventListener(
    "click",
    closeProject
);


/* ==========================================
   BACKDROP CLICK
========================================== */

document
    .querySelector(".modal-backdrop")
    .addEventListener(
        "click",
        closeProject
    );


/* ==========================================
   CREATE THUMBNAILS
========================================== */

function createThumbnails() {

    galleryThumbnails.innerHTML = "";

    currentProject.images.forEach(
        (image, index) => {

            const thumbnail =
                document.createElement("img");

            thumbnail.src = image;

            thumbnail.alt =
                `${currentProject.title} ${index + 1}`;

            thumbnail.classList.add(
                "gallery-thumb"
            );

            thumbnail.addEventListener(
                "click",
                () => {

                    currentIndex = index;

                    updateGallery();

                }
            );

            galleryThumbnails.appendChild(
                thumbnail
            );

        }
    );

}


/* ==========================================
   UPDATE GALLERY
========================================== */

function updateGallery() {

    const image =
        currentProject.images[currentIndex];

    galleryMainImage.style.opacity = "0";

    setTimeout(() => {

        galleryMainImage.src = image;

        galleryMainImage.style.opacity = "1";

    }, 100);


    currentImage.textContent =
        String(currentIndex + 1)
            .padStart(2, "0");


    document
        .querySelectorAll(".gallery-thumb")
        .forEach((thumbnail, index) => {

            const isActive = index === currentIndex;
            thumbnail.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {
                thumbnail.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                });
            }

        });

}


/* ==========================================
   NEXT IMAGE
========================================== */

galleryNext.addEventListener(
    "click",
    () => {

        if (!currentProject) return;

        currentIndex++;

        if (
            currentIndex >=
            currentProject.images.length
        ) {

            currentIndex = 0;

        }

        updateGallery();

    }
);


/* ==========================================
   PREVIOUS IMAGE
========================================== */

galleryPrev.addEventListener(
    "click",
    () => {

        if (!currentProject) return;

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                currentProject.images.length - 1;

        }

        updateGallery();

    }
);


/* ==========================================
   KEYBOARD CONTROLS
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            projectModal.classList.contains(
                "active"
            )
        ) {

            if (event.key === "Escape") {
                closeProject();
            }

            if (event.key === "ArrowRight") {
                galleryNext.click();
            }

            if (event.key === "ArrowLeft") {
                galleryPrev.click();
            }

        }

    }
);


/* ==========================================
   FULLSCREEN IMAGE VIEWER
========================================== */

const imageViewer =
    document.getElementById("imageViewer");

const viewerImage =
    document.getElementById("viewerImage");

const viewerClose =
    document.getElementById("viewerClose");


galleryMainImage.addEventListener(
    "click",
    () => {

        if (!galleryMainImage.src) return;

        viewerImage.src =
            galleryMainImage.src;

        imageViewer.classList.add("active");

    }
);


viewerClose.addEventListener(
    "click",
    () => {

        imageViewer.classList.remove(
            "active"
        );

    }
);


imageViewer.addEventListener(
    "click",
    event => {

        if (
            event.target === imageViewer
        ) {

            imageViewer.classList.remove(
                "active"
            );

        }

    }
);


/* ==========================================
   CURSOR GLOW
========================================== */

const cursorGlow =
    document.querySelector(".cursor-glow");

document.addEventListener(
    "mousemove",
    event => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    }
);


/* ==========================================
   PROFILE PARALLAX
========================================== */

const profileImage =
    document.querySelector(".hero-image");

document.addEventListener(
    "mousemove",
    event => {

        if (!profileImage) return;

        const x =
            (window.innerWidth / 2 -
            event.clientX) / 80;

        const y =
            (window.innerHeight / 2 -
            event.clientY) / 80;

        profileImage.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);