import { Layout } from "../../components/Layout";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <code>
        <pre
          style={{
            backgroundColor: "lightgray",
          }}
        >
          {JSON.stringify(data.post, null, 2)}
        </pre>
      </code>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.postConnection({
    filter: { draft: { eq: false } },
  });
  const paths = data.postConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({params, preview = false}) => {
  const { data, query, variables } = await client.queries.post({
    relativePath: params.slug + ".md",
  });

  return {
    notFound: data?.post?.draft && !preview,
    props: {
      data,
      query,
      variables,
    },
  };
};
