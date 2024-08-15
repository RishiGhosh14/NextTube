import { api } from "~/utils/api";
import moment from "moment";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
// import { UserImage } from "./Components";
import { Button } from "./ui/button";
import { UserImage } from "./Components";


interface Comment {
  comment: {
    id: string;
    message: string;
    createdAt: Date;
  };
  user: {
    id: string;
    name: string | null;
    image: string | null;
    handle: string | null;
  };
}

interface CommentSectionProps {
  videoId: string;
  comments: Comment[];
  refetch: () => Promise<unknown>;
}

export default function CommentSection({
  videoId,
  comments,
  refetch,
}: CommentSectionProps) {
  const [commentInput, setCommentInput] = useState("");
  const addCommentMutation = api.comment.addComment.useMutation();
  const { data: sessionData } = useSession();

  if (!videoId) {
    return <div>Loading...</div>;
  }

  const addComment = (input: {
    videoId: string;
    userId: string;
    message: string;
  }) => {
    addCommentMutation.mutate(input, {
      onSuccess: () => {
        void refetch();
        setCommentInput("");
      },
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComment({
      videoId: videoId,
      userId: sessionData ? sessionData.user.id : ("none" as string),
      message: commentInput,
    });
  };

  return (
    <>
      <div className="py-5 ">
        <div className="flex space-x-3 rounded-2xl border border-primary p-6 shadow-sm">
          <div className="min-w-0 flex-1 space-y-3">
            <p className="block text-sm font-medium leading-6">
              {comments.length}
              <span> Comments</span>
            </p>

            {sessionData ? (
              <form onSubmit={handleCommentSubmit}>
                <div className="mt-2 flex flex-row gap-2">
                  <div className="w-full">
                    <textarea
                      rows={1}
                      name="comment"
                      id="comment"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="block w-full rounded-md border-0 p-4 py-1.5 text-primary shadow-sm ring-1 ring-inset ring-primary placeholder:text-secondary focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      placeholder="Add A Comment"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="default" size="lg" type="submit">
                      Post
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <Button
                onClick={!sessionData ? () => void signIn() : () => ""}
                className="align block w-full rounded-md border-0 p-4 py-1.5 text-left  shadow-sm ring-1 ring-inset  placeholder:text-accent focus:ring-2 sm:text-sm sm:leading-6"
              >
                Add A Comment
              </Button>
            )}
            {comments
              .sort(
                (a, b) =>
                  new Date(b.comment.createdAt).getTime() -
                  new Date(a.comment.createdAt).getTime()
              )
              .map(({ user, comment }) => (
                <div className="my-6" key={comment.id}>
                  <div className="my-4 border-t border-primary" />
                  <div className="flex gap-2">
                    <UserImage image={user.image || ""} />
                    <div className="flex w-full flex-col text-sm ">
                      <div className="flex flex-col ">
                        <div className="flex flex-row gap-2  ">
                          <p className="w-max font-semibold leading-6 text-primary">
                            {user.name}
                          </p>
                          <p className=" ">
                            {moment(comment.createdAt).fromNow()}
                          </p>
                        </div>
                        <p className="text-secondary">{user.handle}</p>
                      </div>
                      <p className="my-2 ">{comment.message}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
