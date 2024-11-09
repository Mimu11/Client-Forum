//tooltip..... 
const tooltipIcons = document.querySelectorAll("#tooltip-icon");
const tooltips = document.querySelectorAll("#tooltip");
tooltipIcons.forEach((icon, index) => {
  icon.addEventListener('mouseover', () => {
    const tooltip = tooltips[index];
    if (tooltip) {
      tooltips[index].classList.remove('hidden');
    }
  })
  icon.addEventListener('mouseout', () => {
    const tooltip = tooltips[index];
    if (tooltip) {
      tooltips[index].classList.add('hidden');
    }
  })
})
// load data from api
const loadData = async (searchText = 'comedy') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();
  const posts = data.posts;
  displayPosts(posts);
};
// display post
const displayPosts = (posts) => {
  const postContainer = document.getElementById("post-container");
  postContainer.textContent = "";
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList = ` p-4`;
    postCard.innerHTML = `
        <div class="space-y-6 lg:space-y-0 lg:flex justify-between  gap-10 rounded-xl p-10 bg-sky-100 shadow-xl">
             <div class="lg:w-[72px] lg:h-[72px]: relative">
                <img src="${post.image}"alt="Movie" />
                <div id="active-posts" class="bg-green-500 absolute -ml-1 lg:ml-16 -mt-64 lg:-mt-20 rounded-full w-6 lg:w-4 h-6 lg:h-4"></div>
            
            </div>
             <div class="space-y-6">
                <p># ${post.category} <span class="ml-4">Author:</span> ${post.author.name}</p>
                <h2 class="card-title">${post.title}</h2>
                <p>${post.description}</p>
                <p class="space-x-5"><i class="fa-regular fa-message"></i><span>${post.comment_count}</span><i class="fa-regular fa-eye"></i>
                        <span>${post.view_count}</span><i class="fa-solid fa-clock"></i><span>${post.posted_time}</span></p>  
                     </div>
            <div class="flex items-end">
                  <i onclick="handleShowTitle(${posts.title})" class="fa-regular fa-envelope-open text-3xl text-green-500"></i>
            </div>
        </div>
        `;
    postContainer.appendChild(postCard);
    const activePost = document.getElementById('active-posts')
    // console.log(activePost)
    // console.log(post)
    const getActive = post.isActive
    if (getActive) {
      activePost.classList.add('bg-green-500');
    }
    else {
      activePost.classList.add('bg-orange-500');
    }
  });
  toggleLoadingSpinner(false);
};
const handleShowTitle = async () => {
  console.log()
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  const data = await res.json();
  const post = data.posts[0];
  console.log(post);
  showPostTitle(post);
};


// show post title
const showPostTitle = (post) => {
  console.log(post)
  const showTitleContainer = document.getElementById("show-title-container");
  showTitleContainer.classList.remove('hidden')
  const titleContainer = document.createElement('div');
  titleContainer.innerHTML = `
  <div class="flex justify-between bg-slate-300 rounded-xl mt-4 p-6">
  <h2 class="card-title">${post.title}</h2>
  <p><i class="fa-regular fa-eye"></i><span>${post.view_count}</span></p>
  </div>
    `;
  showTitleContainer.appendChild(titleContainer);
  const readCount = document.getElementById("read-count");
  const readCountText = readCount.innerText;
  const readCountValue = parseInt(readCountText);
  const latestRead = readCountValue + 1;
  readCount.innerText = latestRead;
};
// search handle
const searchHandle = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadData(searchText);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// card data load
const loadCard = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  const cards = data;
  displayCard(cards);
};
// display card
const displayCard = (cards) => {
  const cardContainer = document.getElementById("card-container");
  cards.forEach((card) => {
    const creatCard = document.createElement("div");
    creatCard.innerHTML = `
        <div class="card lg:w-96 lg:h-[500px] p-6 space-y-8 bg-base-200 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src="${card.cover_image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <p> <i class="fa-solid fa-calendar-week"></i><span id="date"> ${card.author.posted_date}</span></p>
<h4 class="text-xl font-bold">${card.title}</h4>
<p>${card.description}</p>
<div class="flex gap-8">
    <div class="w-[44px] mt-2">
        <img src="${card.profile_image}" alt="" />
    </div>
    <div>
        <h4  class="text-xl mb-2 font-semibold">${card.author.name}</h4>
        <p id="desig">${card.author.designation}</p>
    </div>
</div>
</div>
        `;
    cardContainer.appendChild(creatCard);
  });
};

loadData();
loadCard();

