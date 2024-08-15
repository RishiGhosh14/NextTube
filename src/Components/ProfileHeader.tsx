import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FollowButton } from "./Buttons/Buttons";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Edit } from "./Icons/Icons";
import { ErrorMessage, LoadingMessage, UserImage } from "./Components";
import Head from "next/head";

export default function ProfileHeader() {
  const router = useRouter();
  const { userId } = router.query;
  const { data: sessionData } = useSession();

  if (userId == sessionData?.user.id) {
    console.log("This is your profile");
  }
  const tabs = [
    {
      name: "Videos",
      path: `/${String(userId)}/ProfileVideos`,
      current: router.pathname === `/[userId]/ProfileVideos`,
    },

    {
      name: "Playlists",
      path: `/${String(userId)}/ProfilePlaylists`,
      current: router.pathname === `/[userId]/ProfilePlaylists`,
    },
    {
      name: "Annoucements",
      path: `/${String(userId)}/ProfileAnnouncements`,
      current: router.pathname === `/[userId]/ProfileAnnouncements`,
    },
    {
      name: "Following",
      path: `/${String(userId)}/ProfileFollowing`,
      current: router.pathname === `/[userId]/ProfileFollowing`,
    },
  ];

  useEffect(() => {
    tabs.forEach((tab) => {
      tab.current = tab.path === router.pathname;
    });
  }, [router.pathname]);

  const { data, isLoading, error } = api.user.getChannelById.useQuery({
    id: userId as string,
    viewerId: sessionData?.user?.id as string,
  });

  const channel = data?.user;
  const viewer = data?.viewer;
  const errorTypes = !channel || !viewer || error;

  const Error = () => {
    if (isLoading) {
      return <LoadingMessage />;
    } else if (errorTypes) {
      return (
        <ErrorMessage
          icon="GreenPeople"
          message="Error loading Channel"
          description="Sorry there is a error loading channel at this time."
        />
      );
    } else {
      return <></>;
    }
  };
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Head>
        <title>{channel?.name ? channel.name + " VidChill Channel" : ""}</title>
        <meta name="description" content={channel?.description || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {errorTypes ? (
        <Error />
      ) : (
        <>
          <Image
            className="h-32 w-full object-cover lg:h-64"
            src={channel.backgroundImage || "/background.jpg"}
            width={2000}
            height={2000}
            alt="error"
          />
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="!-mt-6 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <UserImage
                  className="h-24 w-24 rounded-full ring-4 ring-primary sm:h-32 sm:w-32"
                  image={channel.image || ""}
                />
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm: mt-6 min-w-0 flex-1 md:block">
                  <h1 className="truncate text-2xl font-bold text-primary">
                    {channel.name}
                  </h1>
                  <p className="text-regular text-secondary">
                    {channel.handle}
                  </p>
                  <div className="mt-1 flex items-start text-xs">
                    <p className="text-sm text-secondary">
                      {channel.followers} Followers
                    </p>
                    <li className="pl-2 text-sm text-primary"></li>
                    <p className="text-sm text-secondary">
                      {channel.followings} Following
                    </p>
                  </div>
                </div>
                <div className=" mt-6 flex justify-stretch space-y-3 sm:space-x-4 sm:space-y-0">
                  {userId == sessionData?.user.id ? (
                    <Link href="/Settings">
                      <Button
                        variant="default"
                        size="lg"
                        className="!-5 ml-2 flex"
                      >
                        <Edit className="mr-2 h-5 w-5 shrink-0  stroke-secondary" />
                        Edit
                      </Button>
                    </Link>
                  ) : (
                    <FollowButton
                      followingId={userId as string}
                      viewer={{
                        hasFollowed: viewer.hasFollowed,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* BELOW ARE TABS    */}
          <div className="mb-8 mt-4 overflow-x-auto  border-b border-primary">
            <nav
              className=" -mb-px flex min-w-max whitespace-nowrap"
              aria-label="Tabs"
            >
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.path}
                  onClick={(e) => {
                    e.preventDefault();
                    void router.push(tab.path);
                  }}
                  className={classNames(
                    tab.current
                      ? "border-primary bg-primary text-accent"
                      : "border-transparent text-secondary hover:border-primary hover:text-primary",
                    "  w-full border-b-4  px-1 py-4 text-center text-sm font-medium ",
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
