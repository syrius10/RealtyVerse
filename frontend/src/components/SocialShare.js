import React from 'react';

const SocialShare = ({ url }) => {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'facebook-share-dialog', 'width=800,height=600');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/share?url=${encodeURIComponent(url)}`, 'twitter-share-dialog', 'width=800,height=600');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`, 'linkedin-share-dialog', 'width=800,height=600');
  };

  return (
    <div>
      <button onClick={shareOnFacebook}>Share on Facebook</button>
      <button onClick={shareOnTwitter}>Share on Twitter</button>
      <button onClick={shareOnLinkedIn}>Share on LinkedIn</button>
    </div>
  );
};

export default SocialShare;