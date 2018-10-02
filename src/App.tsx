import * as React from "react";

import {
  fetchfromJson,
  immutablePush,
  immutableSplice,
  findIndex,
  contains,
  sortLinks
} from "./data/Helper";

import { IData, ICategory, ILink, IAppProps, IAppState } from "./interfaces";

import {
  Loading,
  ErrorLog,
  MainList,
  MainListItem,
  ChildList,
  ChildListItem,
  Search
} from "./components";

import "./App.css";

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

  private _filterData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { categories, links } = this.state.initialData;

    const filteredLinkLinks = links.filter(
      (link: ILink) =>
        -1 !== link.link.toUpperCase().search(e.target.value.toUpperCase())
    );

    const filteredLinkDescs = links.filter(
      (link: ILink) =>
        -1 !== link.desc.toUpperCase().search(e.target.value.toUpperCase())
    );

    const filteredLinks = Array.from(
      new Set([...filteredLinkLinks, ...filteredLinkDescs])
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
      .sort(sortLinks);
}

export default App;
