console.log(`This is Anish's Portfolio Website`);

/* ------------------navigation menu------------------ */

(() => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    navMenu = document.querySelector('.nav-menu');
    closeNavBtn = navMenu.querySelector('.close-nav-menu');

    hamburgerBtn.addEventListener('click', showNavMenu);
    closeNavBtn.addEventListener('click', hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add('open');
    }

    function hideNavMenu() {
        navMenu.classList.remove('open');
        fadeOutEffect();
    }

    function fadeOutEffect() {
        document.querySelector('.fade-out-effect').classList.add('active');
        setTimeout(() => {
            document.querySelector('.fade-out-effect').classList.remove('active');

        }, 300);
    }


    // attach an event handler to the document
    document.addEventListener('click', (event) => {
        // console.log(event.target);
        if (event.target.classList.contains('link-item')) {
            // console.log("event.target contains 'link-item' class");
            // console.log(event.target.hash);
            // this will return output as #about, #testimonail, #contact


            // make sure that event.target.hash has a value before overriding deafult behavior
            if (event.target.hash !== '') {
                event.preventDefault();
                const hash = event.target.hash;
                // console.log(hash);
                // deactivate existing active section
                document.querySelector('section.active').classList.add('hide');
                document.querySelector('section.active').classList.remove('active');
                // activating active section
                document.querySelector(hash).classList.add('active');
                document.querySelector(hash).classList.remove('hide');

                // deactivate existing active navigation menu 'link-item'
                navMenu.querySelector('.active').classList.add('outer-shadow', 'hover-in-shadow');
                navMenu.querySelector('.active').classList.remove('active', 'inner-shadow');

                // if clicked linkitem is within the navigation menu
                if (navMenu.classList.contains('open')) {

                    // activate new navigation menu link-item 
                    event.target.classList.add('active', 'inner-shadow');
                    event.target.classList.remove('outer-shadow', 'hover-in-shadow');

                    // hide navigation menu
                    hideNavMenu();
                    // console.log('clicked linkitem is within the navigation menu');

                } else {
                    // console.log('clicked linkitem isnot within the navigation menu');
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            // activate new navigation menu link-item
                            item.classList.add('active', 'inner-shadow');
                            item.classList.remove('outer-shadow', 'hover-in-shadow');
                        }
                    })
                    fadeOutEffect();
                }
                // addhash (#) to url
                window.location.hash =hash;
            }

        } else {
            // console.log("event.target does not contain 'link-item' class");

        }

    })

})();



/* ------------------about section tabs------------------ */

(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener('click', (event) => {
        // console.log(event.target)

        // if event.targetcontains 'tab-item' class and does not contain 'active' class
        if (event.target.classList.contains('tab-item') &&
            !event.target.classList.contains('active')) {
            // console.log("event.target contains 'tab-item' class and does not contain 'active' class");
            const target = event.target.getAttribute("data-target");
            // console.log(target);
            // deactivate existing active 'tab-item'
            tabsContainer.querySelector('.active').classList.remove("outer-shadow", "active");
            // activate new 'tab-item'
            event.target.classList.add("active", "outer-shadow");
            // deactivate existing active 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            // activate new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle() {
    document.body.classList.toggle('hidden-scrolling')
}


/* ----------------------------portfolio filter and popup ----------------------------*/

(() => {

    const filterContainer = document.querySelector(".portfolio-filter");
    portfolioItemsContainer = document.querySelector(".portfolio-items");
    portfolioItems = document.querySelectorAll('.portfolio-item');
    // console.log(portfolioItems);
    popup = document.querySelector('.portfolio-popup');
    prevBtn = popup.querySelector(".pp-prev");
    nextBtn = popup.querySelector(".pp-next");
    closeBtn = popup.querySelector(".pp-close");
    projectDetailsContainer = popup.querySelector(".pp-details");
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    /* fliter portfolio items */
    filterContainer.addEventListener('click', (event) => {
        // console.log(event.target);
        // this basically sees which element is being targeted
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains('active')) {
            // console.log('true');  
            // deactivate existing active 'filter-item'
            filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
            // activate new 'filter item'
            event.target.classList.add('active', 'outer-shadow');
            const target = event.target.getAttribute('data-target');
            // console.log('target');
            portfolioItems.forEach(item => {
                // console.log('item');
                // console.log(item.getAttribute('data-category'));
                if (target === item.getAttribute('data-category') || target === 'all') {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });

        } else {
            console.log('false');
        }
        // console.log(event.target)
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        // console.log(event.target);
        // console.log(event.target.closest('.portfolio-item-inner'));
        if (event.target.closest('.portfolio-item-inner')) {
            const portfolioItem = event.target.closest('.portfolio-item-inner').parentElement;
            // console.log(portfolioItem);
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            // console.log(itemIndex);
            // the output is 1, 2, 3, 4, 5 ...
            screenshots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshots');
            // console.log(screenshots);
            // the output is such that we get all the screenshots locations and read to be displayed

            // convert screenshots into array
            screenshots = screenshots.split(',');
            // console.log(screenshots);
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener('click', () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains('active')) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle('open');
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        // console.log(imgSrc);
        const popupImg = popup.querySelector('.pp-img');
        // activate loader until the popupImg loads
        popup.querySelector('.pp-loader').classList.add('active');
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate the loader after the popupImg is loaded
            popup.querySelector('.pp-loader').classList.remove('active');
        }
        popup.querySelector('.pp-counter').innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener('click', () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
        // console.log('slideIndex:' + slideIndex);
    })

    // prev slide
    prevBtn.addEventListener('click', () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
        // console.log('slideIndex:' + slideIndex);
    })

    function popupDetails() {
        // if portfolio-item-details does not exist then:
        if (!portfolioItems[itemIndex].querySelector('.portfolio-item-details')) {
            projectDetailsBtn.style.display = 'none';
            return;
            // this will end function execution
        }
        projectDetailsBtn.style.display = 'block';
        // get the project details
        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        // set the project details
        popup.querySelector('.pp-project-details').innerHTML = details;
        // get the project title
        const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        // console.log(title);
        // set the project title
        popup.querySelector('.pp-title h2').innerHTML = title;
        // get the project category
        const category = portfolioItems[itemIndex].getAttribute('data-category');
        // set the project category
        // console.log(category);
        popup.querySelector('.pp-project-category').innerHTML = category.split('-').join(' ');

    }

    projectDetailsBtn.addEventListener('click', () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        // console.log('hi');
        if (projectDetailsContainer.classList.contains('active')) {
            projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
            projectDetailsBtn.querySelector('i').classList.add('fa-plus');
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = 0 + 'px';
        } else {
            projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
            projectDetailsBtn.querySelector('i').classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
            popup.scrollTo(0, projectDetailsContainer.offsetTop)
        }

    }



    /* ----------------------------testimonial slider----------------------------*/

    (() => {
        // console.log('hello');
        const sliderContainer = document.querySelector('.testi-slider-container');
        slides = sliderContainer.querySelectorAll('.testi-item');
        // console.log(slides);
        slideWidth = sliderContainer.offsetWidth;
        // console.log(slideWidth);
        prevBtn = document.querySelector('.testi-slider-nav .prev');
        nextBtn = document.querySelector('.testi-slider-nav .next');
        activeSlide = sliderContainer.querySelector('.testi-item.active');
        let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
        // console.log(slideIndex);


        // set width of all sides 
        slides.forEach((slide) => {
            // console.log(slide);
            slide.style.width = slideWidth + "px";
        })

        // seet width of slider Container
        sliderContainer.style.width = slideWidth * slides.length + "px";

        nextBtn.addEventListener('click', () => {
            if (slideIndex === slides.length - 1) {
                slideIndex = 0;
            } else {
                slideIndex++;
            }
            // console.log(slideIndex);
            // the output will be 1, 2, 3, 0, 1, 2
            slider();
        })

        prevBtn.addEventListener('click', () => {
            if (slideIndex === 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex--
            }
            console.log(slideIndex);
            // the output will be 3, 2, 1, 0, 3
            slider();
        })

        function slider() {
            // deactivate existing active slides
            sliderContainer.querySelector('.testi-item.active').classList.remove('active');

            // activate new slide 
            slides[slideIndex].classList.add('active')
            sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + 'px';
        }
        slider();


    })();


    /* ----------------------------hide all sections except active----------------------------*/

    (() => {

        // console.log('hii');
        const sections = document.querySelectorAll('.section');
        // console.log(sections);
        sections.forEach((section) => {
            if (!section.classList.contains('active')) {
                section.classList.add('hide');

            }
        })




    })();

    /* ----------------------------preloader----------------------------*/

    // (()=>{
        window.addEventListener('load', () =>{
            // preloader
            document.querySelector('.preloader').classList.add('fade-out');
            setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
            }, 1200);
        })
    // })();



})();
