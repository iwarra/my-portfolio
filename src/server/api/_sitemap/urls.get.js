import { serverQueryContent } from "#content/server";

export default defineSitemapEventHandler(async (event) => {
	const paths = await serverQueryContent(event).only("_path").find();

	return paths.map((p) =>
		asSitemapUrl({
			loc: '/blog' + p._path,
		}),
	);
});
