import React, { FunctionComponent, useEffect, useState } from 'react';

export interface ILink {
  id: number;
  categoryId: number;
  link: string;
  desc: string;
}

interface ICategory {
  id: number;
  name: string;
  children: ILink[];
}

interface ITree {
  id: number;
  name: string;
  isRoot: boolean;
  children: ICategory[];
}

interface IData {
  categories: ICategory[];
  links: ILink[];
}

function parseResult({ categories, links }: IData): ITree {
  const result: ITree = {
    id: 0,
    name: 'ROOT',
    isRoot: true,
    children: []
  };

  for (const category of categories) {
    const obj = { ...category } as ICategory;
    obj.children = links.filter((link: ILink) => link.categoryId === category.id);
    result.children.push(obj);
  }

  return result;
}

const Tree: FunctionComponent<{ url?: string }> = ({ url = '' }) => {
  let [result, setResult] = useState({} as ITree);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data: IData) => setResult(parseResult(data)));
  }, [url]);

  return Object.keys(result).length > 0 ? (
    <>
      <p>{result.name}</p>
      {result.children.map((category: ICategory) => (
        <>
          <p key={`${category.id}`} style={{ marginLeft: '12px' }}>
            {category.name}
          </p>
          {category.children.map((link: ILink) => (
            <p key={`${category.id}_${link.id}`} style={{ marginLeft: '24px' }}>
              <>
                <p>{link.link}</p>
                <span>{link.desc}</span>
              </>
            </p>
          ))}
        </>
      ))}
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Tree;

// https://medium.com/@davidtranwd/implement-tree-view-component-with-reactjs-and-styled-components-5eea3b1603cf
// http://localhost:3000/
// https://yeah-urls.surge.sh/favorite
// https://medium.com/rangle-io/improving-your-mental-model-of-useeffect-c27ea1e2a5a3
// https://fettblog.eu/typescript-react/hooks/
