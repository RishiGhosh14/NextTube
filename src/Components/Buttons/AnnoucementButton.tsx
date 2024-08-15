import React from "react";
import { useEngagementButton } from "~/Hooks/useEngagement";
import { api } from "~/utils/api";
import { ThumbsUp, ThumbsDown } from "~/Components/Icons/Icons"; // replace these with your icons
import { signIn, useSession } from "next-auth/react";

interface AnnouncementButtonProps {
  EngagementData: {
    id: string;
    likes: number;
    dislikes: number;
  };
  viewer: {
    hasLiked: boolean;
    hasDisliked: boolean;
  };
}
export default function AnnouncementButton({
  EngagementData,
  viewer,
}: AnnouncementButtonProps) {
  const { likeCount, dislikeCount, userChoice, handleLike, handleDislike } =
    useEngagementButton({
      EngagementData,
      viewer,
      addLikeMutation: api.announcement.addLikeAnnouncement.useMutation(),
      addDislikeMutation: api.announcement.addDislikeAnnouncement.useMutation(),
    });

  const { data: sessionData } = useSession();
  return (
    <>
      <div className="flex-end isolate  inline-flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={
            sessionData
              ? () =>
                  handleLike({
                    id: EngagementData ? EngagementData.id : "",
                    userId: sessionData ? sessionData.user.id : "",
                  })
              : () => void signIn()
          }
          className={`focus r text-regular group relative inline-flex items-center rounded-l-md  px-2  py-2  focus:z-10
        ${
          userChoice.like
            ? "group text-primary bg-accent hover:text-secondary group-hover:stroke-secondary border-primary  stroke-primary"
            : "group  text-primary bg-base-100 hover:text-secondary group-hover:stroke-primary"
        }`}
        >
          <ThumbsUp
            className={`group h-5 w-5 shrink-0
              ${
                userChoice.like
                  ? "group fill-primary-600 stroke-primary-600 group-hover:stroke-secondary"
                  : "group stroke-primary group-hover:stroke-secondary"
              }
              `}
          />
          <p className="pl-2">{likeCount}</p>
        </button>
        <button
          onClick={
            sessionData
              ? () =>
                  handleDislike({
                    id: EngagementData ? EngagementData.id : "",
                    userId: sessionData ? sessionData.user.id : "",
                  })
              : () => void signIn()
          }
          className={`focus group relative -ml-px inline-flex items-center rounded-r-md  px-2 py-2  focus:z-10

        ${
          userChoice.dislike
            ? "group bg-accent text-primary hover:text-secondary group-hover:stroke-secondary border-primary stroke-primary"
            : "group bg-base-100  text-primary stroke-primary  hover:text-secondary group-hover:stroke-primary"
        }`}
        >
          <ThumbsDown
            className={`group h-5 w-5 shrink-0
            ${
              userChoice.dislike
                ? "group fill-error-600 stroke-error group-hover:stroke-primary"
                : "group stroke-primary group-hover:stroke-error-600"
            }
            }
              `}
          />
          <p className="pl-2">{dislikeCount}</p>
        </button>
      </div>
    </>
  );
}
