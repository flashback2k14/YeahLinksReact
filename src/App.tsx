import * as React from "react";
import { fromJson, IData, ICategory, ILink } from "./DataFetcher";
import "./App.css";

// INTERFACES

interface IDataCompState {
  isLoading: boolean;
  data: IData;
}

interface IMainListItemProps {
  category: ICategory;
}

interface IChildListItemProps {
  link: ILink;
}

// LOADING COMPONENT

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-text">loading...</div>
      <div className="loading-spinner" />
    </div>
  );
};

// MAIN LIST COMPONENTS

const MainList = (props: any) => {
  return <ul className="list-main">{props.children}</ul>;
};

const MainListCardItem = (props: any) => {
  return <div className="card">{props.children}</div>;
};

const MainListItem = (props: IMainListItemProps) => {
  return <li className="list-main_item">{props.category.name}</li>;
};

// CHILD LIST COMPONENTS

const ChildList = (props: any) => {
  return <ul className="list-child">{props.children}</ul>;
};

const ChildListItem = (props: IChildListItemProps) => {
  return (
    <li className="list-child_item">
      <a className="link" href={props.link.link} target="blank">
        {props.link.link}
      </a>
    </li>
  );
};

class App extends React.Component<any, IDataCompState> {
  private _getLinkList = (categoryId: number): ILink[] =>
    this.state.data.links.filter(
      (link: ILink) => link.categoryId === categoryId
    );

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      data: {} as IData
    };
  }

  async componentDidMount() {
    try {
      const result: IData = await fromJson("./data/data.json?" + Date.now);
      this.setState({
        isLoading: false,
        data: result
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <MainList>
        {this.state.data.categories.map((category: ICategory) => (
          <MainListCardItem key={category.id}>
            <MainListItem category={category} />
            <ChildList>
              {this._getLinkList(category.id).map((link: ILink) => (
                <ChildListItem key={link.id} link={link} />
              ))}
            </ChildList>
          </MainListCardItem>
        ))}
      </MainList>
    );
  }
}

export default App;
