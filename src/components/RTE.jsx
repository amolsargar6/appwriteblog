import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller 
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor 
                        value={value} // This ensures the editor reflects the form value
                        apiKey='8rsbt6kdymr1uxso3qgqd7jpk4dxwjsbl1d0nwj1oegg94pt'
                        init={{
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount"
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange} // Ensure this updates the form value
                    />
                )}
            />
        </div>
    );
}
