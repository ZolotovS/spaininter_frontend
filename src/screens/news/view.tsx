import { NewsResponse } from '@/src/app/server-actions';
import { FC } from 'react';
import { PreviewNews } from '@/src/entities/preview-news';
import { MarkdownNews } from './ui/markdown-news';
import { Navigation } from './ui/navigation';
import { SubscribeNewsTg } from '@/src/shared/components/shared/subscribe-news-tg';
import Image from 'next/image';
import { DiscussionWidget } from '@/src/entities/discussion-widget';

type Props = {
	data: NewsResponse;
};

export const NewsPage: FC<Props> = ({ data }) => {
	const markdown = data.data.news.newsTranslations[0].content
		.replace(/\\n/g, '\n\n')
		.replace(/\\|/g, '');

	return (
		<article id='article-content'>
			<section className={'background-section'}>
				<PreviewNews
					imageUrl={data.data.news.poster_link}
					title={data.data.news.newsTranslations[0].title}
					category={
						data.data.news.category.categoryTranslations[0].category_name
					}
					date={data.data.news.createdAt}
					link={data.data.news.newsTranslations[0].link}
					isTopNews
				/>
				<Image
					src={data.data.news.poster_link}
					alt={`${data.data.news.newsTranslations[0].title.slice(0, 20)} image`}
					width={600}
					height={600}
					style={{
						display: 'none'
					}}
				/>
			</section>
			<section
				className={
					'grid  sm:grid-cols-none lg:grid-cols-[280px_2fr_280px] lg:gap-10 mt-5 lg:mt-10 '
				}
			>
				<aside className={'hidden lg:block'}></aside>
				<aside className={''}>
					<MarkdownNews markdown={markdown} />
					<div className={'mt-10 text-center'}>
						<DiscussionWidget />
						<SubscribeNewsTg />
					</div>
				</aside>
				<aside className={'hidden lg:block'}>
					<Navigation markdown={markdown} />
				</aside>
			</section>
		</article>
	);
};
