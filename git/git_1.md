# GIT
<img src = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA0MjlfMTU4%2FMDAxNTg4MTQwNzQyNDE2.e2zwiwuPoZ--dbUUDrsXQqD9pI7cB5-qK80vKbU7MU8g.q8iCRyfBJP4YCw8n2LiMZ0V2Qm9S9b-9RwQC3A1DkHIg.PNG.khu94%2F%25B1%25EA.png&type=sc960_832" width= "200px">

이번 포스팅은 깃에 대해서 알아보는 시간을 가지겠습니다. 깃은 버전 관리 시스템으로 많은 개발자들 사이에서 이제는 필수가 되어버린 그런 도구이죠. 그렇다면 버전 관리 시스템이 무엇일까요? 깃을 설명하기에 앞서 버전 관리 시스템(Version Control System)이라는 개념을 먼저 이해하고 들어가겠습니다.

## Version Control System
![사진](https://git-scm.com/book/en/v2/images/local.png)


버전 관리 시스템을 아주 쉬운 예시로 문서작업을 통해 예시를 들어보겠습니다. 교수님께서 git이라는 주제로 레포트를 작성해 오라는 과제를 내주시고 레포트를 작성할 때에 저희들은 보통 어떻게 문서 관리할까요?

![버전관리시스템 극한적인 예시](https://images.velog.io/images/dudgns3tp/post/7e89846e-669b-4cfd-a9b1-92c22015b6ff/image.png)

네 맞습니다. 저희는 레포트의 개선 사항이나 추가적인 내용을 작성할 때마다 새로 저장하고 혹시나 모를 상황을 대비해서 Version을 업데이트해서 새로운 파일들을 만들어 냅니다.
그래서 저희는 git_version3.md라는 문서 작업 도중. 예상치 못한 상황이 발생하여 작업 중이던 파일이 날아가도 재빠르게 git_version2.md 파일을 불러와서 새롭게 작업할 수도 있습니다.

문서작업처럼 코딩도 마찬가지입니다. 우리가 여러 사람들과 프로젝트를 진행할 때 보통 뼈대부터 시작으로 여러 기능들을 추가, 개선해 나가면서 프로젝트를 완성해 나갑니다. 첫 번째 버전부터.. 두 번째 버전.. 그리고 세 번째 버전 이러한 방법으로 버전을 관리할 수 있습니다. 그렇다면 다시 본론으로 들어가서 버전 관리 시스템이 하는 역할은 무엇일까요

버전 관리 시스템은 앞에서 예시로 들었던 프로세스들을 사람이 수작업으로 관리할 필요 없이 자동적으로 관리해 주는 시스템입니다. 덕분에 사용자들은 오로지 문서 작업에만 집중 할 수 있게 되었습니다.

버전관리 시스템의 종류는 크게 두가지가 있습니다. 중앙집중화 되어있는 버전관리 시스템.


### Centralized Version Control
![중앙집중](https://images.velog.io/images/dudgns3tp/post/0fc09dce-f72f-427b-8bb0-a49b4445f186/image.png)
첫 번째 모델은 중앙 집중 VCS(Version Control System)입니다.
중앙 집중 VCS는 Main Server Repositiory라는 저장 공간이 중앙에 존재하는데 이 저장 공간을 여러 명의 사용자(Collaborators)들이 공유하면서 프로그램 소스나 문서들을 생성, 수정, 삭제하는 작업을 할 때마다 Main Server Repository에 존재하는 파일들을 사용자들의 컴퓨터로 불러와서(Update) 작업을 완료 시킨 후 다시 Main Server Repository에 업로드(Commit)를 하게 됩니다. 이러한 방법이 Centralized Version Control입니다.
생각보다 방법이 단순해서 여러 사용자들이 편리하게 협업이 가능하고 관리자는 어떤 사용자가 어떤 파일을 작업했는지 쉽게 알 수 있는 장점이 있습니다. 하지만 단점도 있습니다. 첫 번째로는 중앙 서버가 다운이 되면 그동안의 업무는 마비가 될 수 있고, 서버의 데이터들이 날아가면 모든 histroy들도 함께 삭제됩니다. 그리고 함께 작업하는 사람들이 많아지게 된다면 파일에 충돌이 많이 생길 수도 있습니다. 


### Distributed Version Control

![](https://images.velog.io/images/dudgns3tp/post/aacd6e89-278c-421a-a709-3fc00fb1efcb/image.png)

두 번째 모델은 분산 버전 관리 시스템 입니다. 분산 버전 관리 시스템은 중앙 집중 VCS와 마찬가지로 중앙에 Main Server Repository가 존재합니다. 그리고 모든 사용자들이 Main Server에 있는 Repository를 통째로 복사해서 개인 Local Repository를 가지고 있는 형태입니다. 따라서 사용자들은 개인마다 Local Repository 안에서 자유롭게 코드, 문서 작업을 함으로써 충돌의 염러 없이 파일들을 수정 할 수 있습니다. 결과적으로 사용자들은 수정한 파일들을 Local Repository에서 Main Server Repository로 병합(Merge) 해 줌으로써 버전관리를 할 수 있게 됩니다.
앞서 설명한 중앙집중VCS와 달리 Main Server가 날아가도 다운받은 Local Repository가 남아있기 때문에 비교적 안정적입니다. 분산VCS의 대표적인 서비스로는 Git이 있습니다.

(Main Server 에서 Merge하게되는 작업들은 다음 포스팅에서 설명하겠습니다.)



