
Open API 액세스 토큰 배포를 위한 플랫폼 만들기
=====================================


> 개발 해 놓은 Open API의 특성상 액세스 토큰의 배포가 필요한 경우가 있습니다.
> 이에, 엑세스 토큰의 배포를 위해 필요한 사용자 정보를 입력받고 봇에 의한 요청을 차단할 수 있는
> 환경의 구축을 위한 예제 코드 입니다.
>
> 적용한 예제는 [DronePlay 개발자 페이지](http://dev.droneplay.io/dev/register/index.html#downlod)에서 보실 수 있습니다.


## 사용환경
> 정적 html을 서비스할 수 있는 웹호스팅 환경.
>
> AWS Lambda (node.js) 

## 사용법
> 현재는 구글, 페이스북, 네이버 사용자로 부터 이메일과 이름을 간편하게 입력받을 수 있도록 되어 있습니다.
> 이를 위해 구글의 *Sign in API*, 페이스북의 *로그인 API*, 네이버의 *네이버 아이디로 로그인 API*의 사용을 신청하시고
> 클라이언트 키를 발급받으셔야 합니다.
> 부여받은 클라이언트 키는 *register.html*, *callback.html* 에 '[ ]'로 비워져 있는 항목에 입력하시면 됩니다.

> *register.html*
<pre><code>

:
7:
8:  ... name="google-signin-client_id" content="[GOOGLE-CLIENT-ID]" ..
9:
:

:
94:
95: clientId: "[NAVER CLIENT ID]",
96:
:

:
117:
118: appId : '[FACEBOOK APP ID]',
119:
:

:
128:
129:  js.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.11&appId=[FACEBOOK APP ID]&autoLogAppEvents=1';
130:
:

</code></pre>


> *callbak.html*
<pre><code>

:
22:
23:	clientId: "[NAVER CLIENT ID]",
24:
:

</code></pre>

> 부가적으로 구글의 Recaptcha API를 통해 봇의 입력을 막고 있습니다. 이에, 구글의 Recaptcha API의 사용을 신청하시고
> 클라이언트 키는 register.html에, 시크릿코드는 AWS Lambda 코드인 index.js 에 입력하시면 됩니다.


> *index.html*
<pre><code>

:
186:
187: 'sitekey' : 'GOOGLE RECAPTCHA SITEKEY]',
188:
:

</code></pre>


> AWS lambda에 사용자등록을 하는 예제 코드 *index.js*에 구글 Recaptcha 시크릿코드를 입력합니다.
> *index.js*

<pre><code>

:
4:
5: const googleRecapchaSecret = "[GOOGLE RECAPTCHA SECRET]";
6:
:

</code></pre>


# 라이센스
라이센스 [보기](LICENSE)



