console.log(`This is Anish's Portfolio Website`);

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
        if (slideIndex === screenshots.length-1) {
            slideIndex = 0;
        } 
        else {
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



})();