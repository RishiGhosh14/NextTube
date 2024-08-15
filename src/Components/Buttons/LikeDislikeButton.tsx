import React from "react";
import { useEngagementButton } from "~/Hooks/useEngagement";
import { api } from "~/utils/api";
import { ThumbsUp, ThumbsDown } from "~/Components/Icons/Icons";
import { signIn, useSession } from "next-auth/react";
import Button from "./Button";

interface LikeDislikeButtonProps {
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

//* change name of component to Video  engagement
export default function LikeDislikeButton({
  EngagementData,
  viewer,
}: LikeDislikeButtonProps) {
  const { likeCount, dislikeCount, userChoice, handleLike, handleDislike } =
    useEngagementButton({
      EngagementData,
      viewer,
      addLikeMutation: api.videoEngagement.addLike.useMutation(),
      addDislikeMutation: api.videoEngagement.addDislike.useMutation(),
    });

  const { data: sessionData } = useSession();
  return (
    <div className="flex-end isolate  inline-flex rounded-md shadow-sm">
      <Button
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
        className={`focus group relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-primary mr-4  focus:z-10
        ${
          userChoice.like
            ? "group bg-base-300 text-primary hover:text-secondary group-hover:stroke-accent"
            : "group bg-base-300 text-primary hover:text-primary-600 group-hover:stroke-primary-600"
        }`}
      >
        <ThumbsUp
          className={`group h-4 w-4 shrink-0 ${
            userChoice.like
              ? "group fill-primary group-hover:stroke-secondary"
              : "group stroke-primary group-hover:stroke-secondary"
          }`}
        />
        <p className="pl-2 text-primary">{likeCount}</p>
      </Button>
      <Button
      variant="primary"
        onClick={
          sessionData
            ? () =>
                handleDislike({
                  id: EngagementData ? EngagementData.id : "",
                  userId: sessionData ? sessionData.user.id : "",
                })
            : () => void signIn()
        }
        className={`focus group relative -ml-px inline-flex items-center rounded-r-md  px-2 py-2 ring-1 ring-inset ring-primary focus:z-10
        ${
          userChoice.dislike
            ? "group bg-error text-primary hover:text-secondary group-hover:stroke-accent"
            : "group bg-base-300 text-primary hover:text-secondary group-hover:stroke-accent stroke-accent"
        }`}
      >
        <ThumbsDown
          className={`group h-4 w-4 shrink-0 ${
            userChoice.dislike
              ? "group fill-primary group-hover:stroke-gray-900"
              : "group stroke-primary group-hover:stroke-error"
          }`}
        />
        <p className="pl-2 text-primary">{dislikeCount}</p>
      </Button>
    </div>
  );
}
