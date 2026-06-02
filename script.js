document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });
    }
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = item.classList.contains('expanded');
            bentoItems.forEach(i => i.classList.remove('expanded'));
            if (!isExpanded) {
                item.classList.add('expanded');
                document.body.classList.add('dimmed');
            } else {
                document.body.classList.remove('dimmed');
            }
        });
    });

    document.addEventListener('click', () => {
        bentoItems.forEach(i => i.classList.remove('expanded'));
        document.body.classList.remove('dimmed');
    });

    const track = document.getElementById('iosCarouselTrack');
    if (track) {
        const imgs = track.querySelectorAll('.carousel-img');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;
        let intervalId;

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % imgs.length;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
            updateCarousel();
        };

        const startAutoSlide = () => {
            intervalId = setInterval(nextSlide, 4000);
        };

        const resetAutoSlide = () => {
            clearInterval(intervalId);
            startAutoSlide();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }

        startAutoSlide();
    }
});
