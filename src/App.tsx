import * as React from "react";
import {
  fetchfromJson,
  immutablePush,
  immutableSplice,
  findIndex,
  contains
} from "./data/Helper";
import {
  IData,
  ICategory,
  ILink,
  IAppProps,
  IAppState,
  IErrorLogProps,
  IMainListItemProps,
  IChildListItemProps
} from "./interfaces";
import "./App.css";

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

// SEARCH COMPONENT

const Search = (props: any) => {
  let refTxtInput: HTMLInputElement;
  let refButtonContainer: HTMLDivElement;

  const _toggle = () => {
    refTxtInput.classList.toggle("search-input_closed");
    refButtonContainer.classList.toggle("search-container_button-right");
    if (refTxtInput.classList.contains("search-input_closed")) {
      refTxtInput.value = "";
      props.onClearFilter();
    } else {
      refTxtInput.focus();
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input search-input_closed"
        ref={(ref: HTMLInputElement) => (refTxtInput = ref)}
        onChange={props.onInputChange}
      />
      <div
        className="search-container_button search-container_button-right"
        ref={(ref: HTMLDivElement) => (refButtonContainer = ref)}
      >
        <button className="reset-button search-button" onClick={_toggle}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,
                  19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 
                  0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// MAIN LIST COMPONENTS

const MainList = (props: any) => {
  return <ul className="list-main">{props.children}</ul>;
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
  return <ul className="card list-child">{props.children}</ul>;
};

const ChildListItem = (props: IChildListItemProps) => {
  return (
    <li
      className={`list-child_item ${
        props.isHidden ? "list-child_item-hidden" : ""
      }`}
    >
      <a className="link" href={props.link.link} target="_blank" rel="noopener">
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
      initialData: {} as IData,
      data: {} as IData,
      showChildListForCategoryIds: []
    };
  }

  async componentDidMount() {
    await this._fetchData();
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
      <React.Fragment>
        <Search
          onInputChange={this._filterData}
          onClearFilter={this._clearFilterData}
        />
        <MainList>
          {this.state.data.categories.map((category: ICategory) => (
            <React.Fragment key={category.id}>
              <MainListItem
                category={category}
                toggle={this._toggleChildList}
              />
              <ChildList>
                {this._getLinkList(category.id).map((link: ILink) => (
                  <ChildListItem
                    key={link.id}
                    link={link}
                    isHidden={contains(
                      this.state.showChildListForCategoryIds,
                      link.categoryId
                    )}
                  />
                ))}
              </ChildList>
            </React.Fragment>
          ))}
        </MainList>
      </React.Fragment>
    );
  }

  private _fetchData = async (): Promise<void> => {
    try {
      const result: IData = await fetchfromJson(this.props.dataSource);
      this.setState({
        isLoading: false,
        initialData: result,
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
  };

  private _filterData = (e: any): void => {
    const { categories, links } = this.state.initialData;

    const filteredLinks = links.filter(
      (link: ILink) =>
        -1 !== link.link.toUpperCase().search(e.target.value.toUpperCase())
    );

    const filteredCategories = categories.filter(
      (category: ICategory) =>
        -1 !==
        filteredLinks.findIndex(
          (link: ILink) => link.categoryId === category.id
        )
    );

    this.setState({
      data: {
        categories: filteredCategories,
        links: filteredLinks
      },
      showChildListForCategoryIds:
        e.target.value === ""
          ? []
          : filteredCategories.map((category: ICategory) => category.id)
    });
  };

  private _clearFilterData = (): void => {
    this.setState((prevState: IAppState) => {
      return {
        data: prevState.initialData,
        showChildListForCategoryIds: []
      };
    });
  };

  private _toggleChildList = (category: ICategory): void => {
    const { showChildListForCategoryIds } = this.state;
    const idx = findIndex(showChildListForCategoryIds, category.id);
    this.setState({
      showChildListForCategoryIds:
        idx !== -1
          ? immutableSplice(showChildListForCategoryIds, idx, 1)
          : immutablePush(showChildListForCategoryIds, category.id)
    });
  };

  private _getLinkList = (categoryId: number): ILink[] =>
    this.state.data.links
      .filter((link: ILink) => link.categoryId === categoryId)
      .sort(this._sortLinks);

  private _sortLinks = (a: ILink, b: ILink): number => {
    const linkA = a.link.toUpperCase();
    const linkB = b.link.toUpperCase();
    if (linkA < linkB) {
      return -1;
    }
    if (linkA > linkB) {
      return 1;
    }
    return 0;
  };
}

export default App;
