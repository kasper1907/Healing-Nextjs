import React, { useEffect } from "react";
import styles from "@/styles/sass/Dashboard/UserMain/comment.module.scss";
import Image from "next/image";
import { CssTextField } from "@/app/(auth)/login/page";
import useSWR from "swr";
import { fetcher } from "@/utils/swr";

const Comments = ({ comments, videoId }: any) => {
  const { data: Comments, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}comments`,
    fetcher
  );

  return (
    <>
      {comments?.length > 0
        ? comments?.map((comment: any, idx: number) => {
            return (
              <div key={idx} className={styles.comment}>
                <div className={styles.write_comment}>
                  <div className={styles.userImgWrapper}></div>
                  <div className={styles.commentInput}>
                    <div className={styles.comment}>{comment?.text}</div>
                    <div className={styles.commentBottom}>
                      <span>Reply</span>
                      <Image
                        src="/images/Dashboard/Oval.svg"
                        alt="oval"
                        width={4}
                        height={4}
                      />
                      <span>23m</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </>
  );
};

export default Comments;
