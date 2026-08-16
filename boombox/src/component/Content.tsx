type ContentProps = {
    content: {
      projectName: string;
      description: string;
      url: string;
      linkText: string;
    };
};

function Content({ content }: ContentProps) {
    return(
        <div className="content">
        <p>{content.projectName}</p>
        <p>{content.description}</p>
        <a href={content.url} target="_blank">
          {content.linkText}
        </a>
      </div>
    )
}

export default Content;