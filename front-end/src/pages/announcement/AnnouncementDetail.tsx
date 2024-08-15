import {useState} from 'react';
import {useParams} from 'react-router-dom';

import {useAnnouncementDetail} from '@/hooks/announcement/useAnnouncementDetail';
import {usePostAnnouncementComment} from '@/hooks/announcement/usePostAnnouncementComment';
import {usePostAnnouncementReply} from '@/hooks/announcement/usePostAnnouncementReply';
import {getFullImageSource} from '@/utils/getFullImageSource';
import {getMemberId} from '@/utils/userData';
import {containerHeaderClass} from '@/styles/styles';

import Header from '@/components/organisms/Navigation/Header';
import Author from '@/components/molecules/Board/Author';
import ArticleTitle from '@/components/molecules/Board/ArticleTitle';
import ArticleSection from '@/components/organisms/Board/ArticleSection';
import CommentSection from '@/components/organisms/Board/CommentSection';
import InputBar from '@/components/organisms/Navigation/InputBar';
import noProfile from '@/assets/no-profile.png';

const AnnounementDetail = () => {
  const {announcementId} = useParams();
  const {data} = useAnnouncementDetail(announcementId!, getMemberId()!);
  const postCommentMutation = usePostAnnouncementComment();
  const postReplyMutation = usePostAnnouncementReply();
  const [parentCommentId, setParentCommentId] = useState<number>(0);

  const handleCommentSubmit = (content: string) => {
    console.log(parentCommentId);
    if (parentCommentId === 0) {
      postCommentMutation.mutate({
        announcementId: announcementId!,
        memberId: getMemberId()!,
        content,
      });
    } else {
      postReplyMutation.mutate({
        announcementCommentId: parentCommentId,
        memberId: getMemberId()!,
        content,
      });

      setParentCommentId(0);
    }
  };

  const handleReplyClick = (commentId: number) => {
    setParentCommentId(commentId);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="공지사항" buttonType="back" />
      <div className={containerHeaderClass}>
        <Author
          profile={getFullImageSource(data?.picture) || noProfile}
          writer="햄스터반 선생님"
          date={data?.post.createdDateTime || ''}
          isEdit={data?.canDelete}
        />
        <ArticleTitle title={data?.post.title || ''} />
        <ArticleSection
          content={data?.post.content || ''}
          images={data?.images || []}
        />
        <CommentSection
          commentCount={data?.commentCount || 0}
          comments={data?.comments || []}
          onReplyClick={handleReplyClick}
          selectedCommentId={parentCommentId}
        />
      </div>
      <InputBar onSubmit={handleCommentSubmit} />
    </div>
  );
};

export default AnnounementDetail;