"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loader/Loading";
import Imagegallery from "@/components/gallery/Imagegallery";
import Link from "next/link";
export default function SinglePage({ params }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = params.id;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/project/fetch-single/${id}`);
        setProject(response.data.project);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch project data");
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className=" flex justify-end fixed right-0 z-50 p-2">
        <Link href={`/admin/page/addnew/update/${project._id}`}>
          <button className=" bg-2 text-white  px-3 py-1 rounded-md">Update Details</button>
        </Link >
      </div>
      <h2 className=" font-semibold text-2xl underline underline-offset-4 my-2">Feature Images</h2>
      <Imagegallery item={project.featureImage} />
      <h2 className=" font-semibold text-2xl underline underline-offset-4 mt-4 mb-2">Images</h2>
      <Imagegallery item={project.images} />
    </>
  );
}
