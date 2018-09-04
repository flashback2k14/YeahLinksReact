import * as React from "react";
import { fromJson, IData, ICategory, ILink } from "./DataFetcher";
import "./App.css";

// INTERFACES

interface IAppProps {
  dataSource: string;
}

interface IAppState {
  isLoading: boolean;
  hasErrors: boolean;
  errorMessage: string;
  error: Error;
  data: IData;
  showChildListForCategoryId: number;
}

interface IErrorLogProps {
  errorMessage: String;
  error: Error;
}

interface IMainListItemProps {
  category: ICategory;
  toggle: Function;
}

interface IChildListItemProps {
  link: ILink;
  isHidden: boolean;
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

// ERROR COMPONENT

const ErrorLog = (props: IErrorLogProps) => {
  return (
    <div className="error-container">
      <h3 className="error-message">Error: {props.errorMessage}</h3>
      <pre className="error-object">{JSON.stringify(props.error, null, 2)}</pre>
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
  return (
    <li className="list-main_item" onClick={() => props.toggle(props.category)}>
      {props.category.name}
    </li>
  );
};

// CHILD LIST COMPONENTS

const ChildList = (props: any) => {
  return <ul className="list-child">{props.children}</ul>;
};

const ChildListItem = (props: IChildListItemProps) => {
  return (
    <li
      className={`list-child_item ${
        props.isHidden ? "list-child_item-hidden" : ""
      }`}
    >
      <a className="link" href={props.link.link} target="blank">
        {props.link.link}
      </a>
    </li>
  );
};

// MAIN COMPONENT

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      isLoading: true,
      hasErrors: false,
      errorMessage: "",
      error: new Error(),
      data: {} as IData,
      showChildListForCategoryId: -1
    };
  }

  async componentDidMount() {
    try {
      const result: IData = await fromJson(this.props.dataSource);
      this.setState({
        isLoading: false,
        data: result
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        hasErrors: true,
        errorMessage: error.message,
        error: error
      });
    }
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : this.state.hasErrors ? (
      <ErrorLog
        errorMessage={this.state.errorMessage}
        error={this.state.error}
      />
    ) : (
      <MainList>
        {this.state.data.categories.map((category: ICategory) => (
          <MainListCardItem key={category.id}>
            <MainListItem category={category} toggle={this._toggle} />
            <ChildList>
              {this._getLinkList(category.id).map((link: ILink) => (
                <ChildListItem
                  key={link.id}
                  link={link}
                  isHidden={
                    link.categoryId !== this.state.showChildListForCategoryId
                  }
                />
              ))}
            </ChildList>
          </MainListCardItem>
        ))}
      </MainList>
    );
  }

  private _toggle = (category: ICategory) => {
    this.setState({
      showChildListForCategoryId:
        category.id === this.state.showChildListForCategoryId ? -1 : category.id
    });
  };

  private _getLinkList = (categoryId: number): ILink[] =>
    this.state.data.links.filter(
      (link: ILink) => link.categoryId === categoryId
    );
}

export default App;
