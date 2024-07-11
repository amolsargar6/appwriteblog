import React, {useEffect, useState} from 'react';
import appwriteService from '../appwrite/config'
import  {PostCard, Container}  from '../components';
function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts().then((posts) =>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, []);

    //if posts length 0 as in posts does not exist and it means user is not loged in
    if(posts.length === 0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                    <h1 className='text-2xl font-bold hover:text-gray-500'>
                        login to read posts
                    </h1>
                    </div>
                </Container>
            </div>
        )
    } 


    //if post exist and we got some response from the appwrite server then we have to display the posts
    return (
        <div className='w-full py-8'>
            <Container>
                {
                    posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))
                }
            </Container>
        </div>
    );
}


export default Home;
