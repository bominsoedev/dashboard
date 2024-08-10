import React from 'react';
import {Card} from "@/Components/Card";
import {formatDate} from "@/lib/formatDate"; // Ensure this is the correct path to the formatDate function

interface ArticleProps {
    article: {
        slug: string;
        title: string;
        created_at: string;
        excerpt: string;
    };
}

const Article: React.FC<ArticleProps> = ({ article }) => {
    return (
        <Card as="article">
            <Card.Title href={`/articles/${article.slug}`}>
                {article.title}
            </Card.Title>
            <Card.Eyebrow as="time" dateTime={article.created_at} decorate>
                {formatDate(article.created_at)}
            </Card.Eyebrow>
            <Card.Description>{article.excerpt}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
        </Card>
    );
};

export default Article;
