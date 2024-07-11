import React, {useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Button, Input, Select, RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



function PostForm({post}) {

    console.log('post :: ', post);
    

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"

        }
    })

    const navigate = useNavigate();

    const userData = useSelector(state => state.userData)
    console.log('userData :: ',userData);

    const submit =  async(data) => {
        console.log('inside submit :: data :: ', data);
        //this is if post already exist and user want to edit the post
        if(post) {

            //is user want to upload the image
            const file = data.image[1] ? await appwriteService.uplaodFile(post.image[0]) : null

            
            if(file) {
                appwriteService.deleteFile(post.featuredImgae) 
                //featuredImage is an ID for the previously uploaded image in db
            }

            const dbPost = await appwriteService.updatePost(post.$id , {
                ...data,
                featuredImage: file? file.$id : undefined,

                
            });

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }

        } 
        //this case is for --> if user wants to create the new post
        else {
            //to improve the performance we can check is file exist then upload it
            
            // const file = data.image[0] ? appwriteService.uplaodFile(post.image[0]) : null

            const file = await appwriteService.uplaodFile(data.image[0])

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                
                /*
                instead of directly passing the data for create post we spread the data, cuz we needed userId for post creation and the post data does no contain the userId hence we need to fetch it from the userdata 
                */
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g,'-') //this will replace everything except for a-z A-Z digits and space with '-'
                .replace(/\s/g, '-')
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate : true}))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])
    
    return (
        <div>
            <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                {/* title for your blog */}
                <Input 
                        label="Title"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", {required: true})}
                />

                {/* content of your blog */}
                <Input 
                        label="Slug"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", {required: true})}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value, {shouldValidate:true}))
                        }}
                />

                {/* Text editor for blog */}
                <RTE 
                        label="Content"
                        name="content"
                        control = {control}
                        defaultValues = {getValues("content")}
                />
                
            </div>
            <div className='w-1/3 px-2'>
                <Input 
                    label = "Featured Image: "
                    type='file'
                    className='mb-4'
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {required: !post})}
                />

                {   
                    
                    post && (
                        <div>
                            <img 
                                src={appwriteService.getFIlePreview(post.featuredImage)}
                                alt={post.title}
                                className='rounded-lg'
                            />
                        </div>
                    )
                }

                <Select
                        options = {["active", "inactive"]}
                        label="Status"
                        className='mb-4'
                        {...register("status", {required:true})}
                />
                
                <Button  type="submit" bgColor = {post ? "bg-green-500" : undefined} className = "w-full">
                        {post ? "Update" : "Submit"}
                </Button>
            </div>
            </form>
        </div>
    );
}

export default PostForm;
