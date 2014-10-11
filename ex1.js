function vaibuscarasissues(){
    function GithubRepo(username, reponame){
	var url = 'https://api.github.com/repos/'+ username + '/' + reponame + '/issues';
	return {
		busca_issues_e_popula_tabela : function(tabelaId) {
			$(tabelaId + " tbody").remove();
			$.get(url).success(function(result){
				var issues = JSON.parse(JSON.stringify(result));	
				for (var i=0; i<issues.length; i++) {
					addIssues(issues[i],tabelaId);
				}
			});
		}
	}
	function addIssues(issue, tabelaId){
		var issueHTML = '<tr>';
		issueHTML += '<td>' + issue.number +'</td>';
		issueHTML += '<td>' + issue.title+'</td>';
		issueHTML += '</tr>';
		$(tabelaId).append(issueHTML)
	}
    }



    var username = $('#user').val();
    var reponame = $('#reponame').val();

    var le_repo = GithubRepo(username, reponame);
    le_repo.busca_issues_e_popula_tabela("#issuestable");
}
