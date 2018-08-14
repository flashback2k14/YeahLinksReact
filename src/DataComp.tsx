import * as React from "react";
import { fromJson, IData, ICategory, ILink } from "./DataFetcher";
import "./DataComp.css";

interface IDataCompState {
  loading: boolean;
  data: IData;
}

class DataComp extends React.Component<any, IDataCompState> {
  private _getLinkList = (categoryId: number) => {
    const subsetList: ILink[] = this.state.data.links.filter(
      (link: ILink) => link.categoryId === categoryId
    );
    return (
      <ul className="list-child">
        {subsetList.map((link: ILink) => {
          return (
            <li className="list-child_item" key={link.id}>
              <a className="link" href={link.link} target="blank">
                {link.link}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      data: {} as IData
    };
  }

  async componentDidMount() {
    const result: IData = await fromJson("./data/data.json");
    this.setState(prevState => {
      return {
        loading: !prevState.loading,
        data: result
      };
    });
  }

  render() {
    return this.state.loading ? (
      <p>loading...</p>
    ) : (
      <ul className="list-main">
        {this.state.data.categories.map((category: ICategory) => (
          <div className="card">
            <li className="list-main_item" key={category.id}>
              {category.name}
            </li>
            {this._getLinkList(category.id)}
          </div>
        ))}
      </ul>
    );
  }
}

export default DataComp;
