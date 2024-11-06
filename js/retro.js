const loadData = async (searchText = "comedy", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();
  const posts = data.posts;
  displayPosts(posts, isShowAll);
};

const displayPosts = (posts, isShowAll) => {
  const postContainer = document.getElementById("post-container");
  postContainer.textContent = "";
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList = ` p-4`;
    postCard.innerHTML = `
        <div class="lg:flex gap-10 rounded-xl p-10 bg-sky-100 shadow-xl">
             <div class="lg:w-[72px] lg:h-[72px]: ">
                <img src="${post.image}"alt="Movie" />
            </div>
             <div class="space-y-6 ">
                <p># ${post.category} <span class="ml-4">Author:</span> ${post.author.name}</p>
                <h2 class="card-title">${post.title}</h2>
                <p>${post.description}</p>
                
            
                <p class="space-x-5"><i class="fa-regular fa-message"></i><span>${post.comment_count}</span><i class="fa-regular fa-eye"></i>
                        <span>${post.view_count}</span><i class="fa-solid fa-clock"></i><span>${post.posted_time}</span></p>  
                     </div>
            <div class="flex items-end justify-end">
            
                      <button onclick="handleShowTitle()" class="btn btn-accent">Title</button>

            </div>
        </div>

        `;
    postContainer.appendChild(postCard);
  });
  toggleLoadingSpinner(false);
};

const handleShowTitle = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  const data = await res.json();
  const post = data.posts;
  console.log(post);

  showPostTitle(post);
};

const showPostTitle = (post) => {
  const showTitleContainer = document.getElementById("show-title-container");
  post.forEach((post) => {
    showTitleContainer.classList.remove("hidden");
    showTitleContainer.innerHTML = `
        <h2 class="card-title">${post.title}</h2>
        <p><i class="fa-regular fa-eye"></i><span>${post.view_count}</span></p>
        `;
    const readCount = document.getElementById("read-count");
    const readCountText = readCount.innerText;
    const readCountValue = parseInt(readCountText);
    const latestRead = readCountValue + 1;
    readCount.innerText = latestRead;
  });
};
// search handle
const searchHandle = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadData(searchText, isShowAll);
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
