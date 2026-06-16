import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Raka Ramadhani Aulia Prasetyo | Portfolio",
  description = "A portfolio showcasing the projects and experience of Raka Ramadhani Aulia Prasetyo, an engineer, developer, and designer.",
  keywords = "Raka Ramadhani, Portfolio, Software Engineer, Web Developer, Full Stack Developer, React, Next.js, raprast",
  url = "https://raprast.asia",
  image = "https://raprast.asia/real_avatar.png",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="desc" />
      <meta name="keywords" content={keywords} key="keywords" />
      <meta name="author" content="Raka Ramadhani Aulia Prasetyo" key="author" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" key="ogtype" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:image" content={image} key="ogimage" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta name="twitter:url" content={url} key="twurl" />
      <meta name="twitter:title" content={title} key="twtitle" />
      <meta name="twitter:description" content={description} key="twdesc" />
      <meta name="twitter:image" content={image} key="twimage" />

      <link rel="canonical" href={url} key="canonical" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    </Head>
  );
};

export default SEO;
