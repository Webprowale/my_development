import { NextRequest, NextResponse } from "next/server";

import { UploadFile } from "@/lib/upload-image";

const corsHeaders = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();

    console.log("Form Data", formData);

    // Get array of files from FormData
    const files = Object.values(formData);

    // // Check if files array is empty
    // if (files.length === 0) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "No files found in the request",
    //     },
    //     {
    //       status: 400,
    //       headers: corsHeaders,
    //     },
    //   );
    // }

    const uploadedFiles = [];

    for (let i = 0; formData.has(`file${i}`); i++) {
      const file = formData.get(`file${i}`) as File;
      const uploadedFile = (await UploadFile(file, "gopaddi-staging")) as any;
      // console.log("uploaded files", uploadedFile);
      uploadedFiles.push({
        file: uploadedFile.secure_url,
        tags: uploadedFile?.info?.categorization?.google_tagging,
      });
    }

    // console.log(uploadedFiles);
    return NextResponse.json(
      {
        success: true,
        message: "Files uploaded successfully",
        data: uploadedFiles,
      },
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.log(error);
    // return NextResponse.error(new Error("Failed to upload files"));
  }
}
