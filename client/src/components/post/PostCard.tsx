import React, { useState } from 'react';
import { PostAndInteractions } from '../../contexts/Post/types/PostTypes';
import PostCreatorInfo from '../user-related/PostCreatorInfo';
import EditSection from './sections/EditSection';
import PostCardSection from './sections/PostCardSection';
import VoteSection from './sections/voteSection';

interface PostCardProps {
	postAndInteraction: PostAndInteractions;
}

const PostCard: React.FC<PostCardProps> = ({ postAndInteraction }) => {
	return (
		<div className="card my-3 ">
			<div className="card-body">
				<div className="d-flex justify-content-between">
					{/* left */}
					<div className="d-flex justify-content-between">
						<VoteSection postAndInteractions={postAndInteraction} />

						<div>
							<PostCreatorInfo postAndInteractions={postAndInteraction} />
							<div className="d-flex flex-column justify-content-between" style={{ color: 'gray' }}>
								<PostCardSection postAndInteractions={postAndInteraction} />
							</div>
						</div>
					</div>

					{/* right */}
					<EditSection postAndInteractions={postAndInteraction} isNotMain={false} />
				</div>
			</div>
		</div>
	);
};

export default PostCard;
