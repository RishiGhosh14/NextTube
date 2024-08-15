import { type NextPage } from "next";
import Head from "next/head";
import {
  ErrorMessage,
  Layout,
  LoadingMessage,
  Thumbnail,
} from "../Components/Components";
import { useSession } from "next-auth/react";
import {
  DeleteButton,
  PublishedButton,
  UploadButton,
  EditButton,
} from "~/Components/Buttons/Buttons";
import { api } from "~/utils/api";
import { GreenEye, GreenUserCheck, GreenHeart } from "~/Components/Icons/Icons";
import React from "react";
const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();

  const userId = sessionData?.user.id;
  const { data, isLoading, error, refetch } =
    api.user.getDashboardData.useQuery(userId as string);

  interface StatsItem {
    name: string;
    stat: string;
    icon: (className: string) => JSX.Element;
  }
  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (error || !data) {
      return (
        <ErrorMessage
          icon="GreenPeople"
          message="Error loading channel"
          description="Sorry there is at this time."
        />
      );
    } else {
      return <></>;
    }
  };

  const stats: StatsItem[] = [
    {
      name: "Total Views",
      stat: data?.totalViews?.toString() || "0",
      icon: (className) => <GreenEye className={className} />,
    },
    {
      name: "Total followers",
      stat: data?.totalFollowers?.toString() || "0",
      icon: (className) => <GreenUserCheck className={className} />,
    },
    {
      name: "Total likes",
      stat: data?.totalLikes?.toString() || "0",
      icon: (className) => <GreenHeart className={className} />,
    },
  ];

  return (
    <>
      <Head>
        <title>Creator Studio - VidChill</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout closeSidebar={true}>
        <>
          {!data ? (
            <Error />
          ) : (
            <div className="flex flex-col gap-8 bg-base-200 pt-3 shadow sm:rounded-lg">
              <div className="md:flex md:items-center md:justify-between md:space-x-5">
                <div className="flex items-start space-x-5">
                  <div className="pt-1.5">
                    <h1 className="text-2xl font-bold text-primary">
                      <span>Welcome Back </span> {sessionData?.user.name}
                    </h1>
                    <p className="text-sm font-medium text-secondary">
                      Track and manage your channel and videos
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                  <UploadButton refetch={refetch} />
                </div>
              </div>
              <div>
                <dl className="mt-5 grid grid-cols-1 divide-y divide-primary overflow-hidden rounded-2xl border border-primary  shadow-sm   md:grid-cols-3 md:divide-x md:divide-y-0">
                  {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 sm:p-6">
                      {item.icon("h-4 w-4 ")}
                      <dt className="text-base font-normal text-primary">
                        {item.name}
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-primary-600 md:block lg:flex">
                        {item.stat}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-primary p-6 px-4 shadow-sm sm:px-6 lg:px-8">
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-primary">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-secondary sm:pl-0"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-secondary"
                            >
                            Published
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-secondary"
                            >
                              Uploaded
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-secondary"
                            >
                              Rating
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-secondary"
                            >
                              Data Uploaded
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary bg-base-300">
                          {data?.videos.map((video) => (
                            <tr key={video.id}>
                              <PublishedButton video={video} />
                              <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="flex">
                                  <div className="h-16 w-16 flex-shrink-0">
                                    <Thumbnail
                                      thumbnailUrl={video.thumbnailUrl || ""}
                                    />
                                  </div>
                                  <div className="ml-4 font-medium text-primary">
                                    {video.title}
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm ">
                                <span className="inline-flex items-center rounded-full bg-success px-2 py-1 text-xs font-medium ">
                                  {video.likes} Likes
                                </span>
                                <span className="inline-flex items-center rounded-full ml-3  bg-error px-2 py-1 text-xs font-medium t">
                                  {video.dislikes} Dislikes
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm">
                                {video.createdAt.toLocaleDateString()}
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm">
                                <div className="flex flex-row gap-2">
                                  <DeleteButton
                                    videoId={video.id}
                                    refetch={refetch}
                                  />

                                  <EditButton
                                    video={{
                                      id: video?.id || "",
                                      title: video?.title || "",
                                      description: video?.description || "",
                                      thumbnailUrl: video?.thumbnailUrl || "",
                                    }}
                                    refetch={refetch}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </Layout>
    </>
  );
};

export default Dashboard;
