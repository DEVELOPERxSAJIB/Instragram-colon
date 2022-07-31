// get elements
const add_new_post = document.getElementById('add-new-post');
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all-post');

// get all post 
const getAllPost = () => {
    // get data form LS
    let data = readLSData('product');

    // check LS Data exists
    if (!data) {
        all_post.innerHTML = `<p class="text-center">No Post Found</p>`
        return false;
    }

    // show LS Data if exists
    if (data) {
         // init value
        let list = '';

        // loop for data
        data.reverse().map((item) => {
            list += `
            
            <div class="card mt-3">
                <div class="card-body">
                <div class="post-auth-area">
                    <div class="user-info">
                        <img src="${item.aphoto}" alt="">
                        <div class="details">
                            <p>${item.aname}</p>
                            <span>${item.location}</span>
                        </div>
                    </div>
                    <div class="dropdown">
                        <a class="dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="fas fa-ellipsis-h"></i>
                        </a>
                    
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Edit</a></li>
                        <li><a class="dropdown-item delete-post" href="#" post_id=${item.id}>Delete</a></li>
                        <li><a class="dropdown-item" href="#">Cancel</a></li>
                        </ul>
                    </div>
                </div>
                </div>
                <img src="${item.pphoto}" alt="">
                <div class="post-content-area margin p-2">
                    <p>${item.pcontent}</p>
                </div>
                </div>
            
            `
        });

        all_post.innerHTML = list;

    }
}

getAllPost();

// validation form
add_new_post.onsubmit = (e) => {
    e.preventDefault();

    // form data get
    let form_data = new FormData(e.target);
    let getPost = Object.fromEntries(form_data.entries());
    let {aname, aphoto, pcontent, pphoto, location} = Object.fromEntries(form_data.entries());

    // Create random ID
    let randID = Math.floor(Math.random() * 1000) + '_' + Date.now();

    // validation msg 
    if (!aname || !aphoto || !pcontent || !pphoto){
        msg.innerHTML = setAlert('All feilds are required');
    } else {
        createLSData('product', {...getPost, id : randID});
        e.target.reset();
        getAllPost();
    }
}

// Delete Post
all_post.onclick = (e) => {
    e.preventDefault();

    if(e.target.classList.contains('delete-post')){
        // get post ID
        const postID = e.target.getAttribute('post_id');

        // get all post 
        const posts = readLSData('product');

        // delete data array
        const delete_data = (posts.filter(data => data.id !== postID));

        // now update all post
        confirm('Are You Sure to Delete this Post?')
        uploadLSData('product', delete_data);
        getAllPost();
    }
}
