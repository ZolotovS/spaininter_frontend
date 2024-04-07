import { NewsResponse } from '@/src/app/server-actions';
import { FC } from 'react';
import { PreviewNews } from '@/src/entities/preview-news';
import { MarkdownNews } from './ui/markdown-news';
import { Navigation } from './ui/navigation';
import { SubscribeNewsTg } from '@/src/shared/components/shared/subscribe-news-tg';

type Props = {
	data: NewsResponse;
};

export const NewsPage: FC<Props> = ({ data }) => {
	const markdown = data.data.news.newsTranslations[0].content
		.replace(/\\n/g, '\n\n')
		.replace(/\\|/g, '');

	return (
		<article id='article-content'>
			<section>
				<PreviewNews
					imageUrl={data.data.news.poster_link}
					title={data.data.news.newsTranslations[0].title}
					category={
						data.data.news.category.categoryTranslations[0].category_name
					}
					date={data.data.news.createdAt}
					link={data.data.news.newsTranslations[0].link}
				/>
			</section>
			<section className={'grid grid-cols-6 gap-10 mt-10'}>
				<aside className={'col-span-6 lg:col-span-4'}>
					<MarkdownNews markdown={markdown} />
					<div className={'mt-10 text-center'}>
						<SubscribeNewsTg />
					</div>
				</aside>
				<aside className={'col-span-2 relative hidden lg:block'}>
					<Navigation markdown={markdown} />
				</aside>
			</section>
		</article>
	);
};
