<main>
    <div class="sc-c539bd80-0 WZzBU">
        <div class="ant-row justify-content-center">
            <?php echo $cms["page"]["text"]; ?>
            <div class="ant-col mainCatalogContent ant-col-xs-24 ant-col-lg-18 ant-col-xl-19" id="macBook">
                <section id="catalog-listing" class="sc-8c264e80-0 kqFUqp"><div class="sc-8c264e80-1 jXUPbv"><div data-virtuoso-scroller="true" style="position: relative; width: 100%;"><div style="width: 100%;
                            height: 100%;"><div class="sc-8c264e80-1 jXUPbv virtuoso-grid-list" data-test-id="virtuoso-item-list">
                
          
            
        
        
   
<?php 
    $q = "SELECT * FROM pages WHERE tpl = 'post' ORDER BY id DESC";
    if ( $res = mysqli_query( $cms["base"], $q ) ) {

        $pager = 0;
        $pcount = 0;
        $cluster = "";

        while ( $page = mysqli_fetch_assoc( $res ) ) {
            if ( $page['created'] <= date( 'Y-m-d H:i:s' ) ) {

                if ( preg_match( '/<img[^>]+data-preview[^>]*>/us', $page['text'], $m ) ) {
                    $preview_img = $m[0];
                } else {
                    $preview_img = '';
                }
                if ( preg_match('/<span[^>]+data-code[^>]*>.*?<\/span>/us', $page['text'], $m) ) {
                    $code = $m[0];
                } else {
                    $code = '';
                }
                 if ( preg_match('/<span[^>]+data-price[^>]*>.*?<\/span>/us', $page['text'], $m) ) {
                    $price = $m[0];
                } else {
                    $price = '';
                }
                if ( preg_match( '/^(.*)(<!--[\s]*preview-start[\s]*-->)(.*)(<!--[\s]*preview-end[\s]*-->)(.*)$/us', $page['text'], $m ) ) {
                    $preview = $m[3];
                } else {
                    $preview = preg_replace( "/<h1>(.*?)<\/h1>/u", "", $page['text'] );
                    $preview = mb_substr( strip_tags( $preview ), 0, 500 );
                    $preview = preg_replace( '/\s\S*$/u', ' ...', $preview );
                    $preview = "<p>{$preview}</p>";
                }

                $html = "<div
                              class='sc-8c264e80-2 cKJncB virtuoso-grid-item'
                              data-index='0'
                            >
                              <div class='sc-8c264e80-2 cKJncB'>
                                <article class='sc-5528e80-0 kiUiHh'>
                                  <div class='sc-5528e80-6 cuECFX'>
                                    Код товара:&nbsp;
                                    <span class='code_item'>{$code}</span>
                                  </div>
                                  <div class='sc-5c3055d-0 jJYNFY'>
                                    <button
                                      aria-label='Добавить в список сравнения'
                                      data-product-code='114583'
                                      aria-pressed='false'
                                      type='button'
                                      class='ant-btn ant-btn-round ant-btn-default sc-def5ee79-0 jgJJWM sc-5c3055d-1 gOznbB gtm-compare sc-5c3055d-1 gOznbB gtm-compare'
                                    >
                                      <svg
                                        class='sc-5d1faee2-0 gkHZpZ gtm-compare'
                                        width='24'
                                        height='24'
                                        aria-hidden='true'
                                      >
                                        <use xlink:href='#compro'></use>
                                      </svg></button
                                    ><button
                                      data-product-code='114583'
                                      aria-label='Добавить в избранное'
                                      aria-pressed='false'
                                      type='button'
                                      class='ant-btn ant-btn-round ant-btn-default sc-def5ee79-0 jgJJWM sc-5c3055d-1 gOznbB gtm-favorites sc-5c3055d-1 gOznbB gtm-favorites'
                                    >
                                      <svg
                                        class='sc-5d1faee2-0 gkHZpZ gtm-favorites'
                                        width='24'
                                        height='24'
                                        aria-hidden='true'
                                      >
                                        <use
                                          xlink:href='#small_icon_like'
                                        ></use>
                                      </svg>
                                    </button>
                                  </div>
                                  <p class='sc-5528e80-2 gRuMUP'>
                                    <a
                                      title='Перейти к товару «{$page['title']}»'
                                      href='{$page['url']}'
                                      target='_blank'
                                      ><span
                                        >{$page['title']}</span
                                      ></a
                                    >
                                  </p>
                                  <div
                                    class='sc-5528e80-1 hiQNMd buy_item__img'
                                  >
                                    <a
                                      title='{$page['title']}'
                                      href='{$page['url']}'
                                      target='_blank'
                                      ><div class='sc-5eab3ecc-0 cWjvHl'>
                                        <span class='item_img'
                                          style='
                                            box-sizing: border-box;
                                            display: inline-block;
                                            overflow: hidden;
                                            width: initial;
                                            height: initial;
                                            background: none;
                                            opacity: 1;
                                            border: 0px;
                                            margin: 0px;
                                            padding: 0px;
                                            position: relative;
                                            max-width: 100%;
                                          '
                                          ><span
                                            style='
                                              box-sizing: border-box;
                                              display: block;
                                              width: initial;
                                              height: initial;
                                              background: none;
                                              opacity: 1;
                                              border: 0px;
                                              margin: 0px;
                                              padding: 0px;
                                              max-width: 100%;
                                            '
                                            ><img
                                              alt=''
                                              aria-hidden='true'
                                              src='data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27252%27%20height=%27228%27/%3e'
                                              style='
                                                display: block;
                                                max-width: 100%;
                                                width: initial;
                                                height: initial;
                                                background: none;
                                                opacity: 1;
                                                border: 0px;
                                                margin: 0px;
                                                padding: 0px;
                                              ' /></span
                                          >{$preview_img}</span></div
                                    ></a>
                                  </div>

                                  <div class='sc-5528e80-7 exVtSF'>
                                    <div class='sc-5528e80-4 ewMVFG'>
                                      <div class='sc-4931bb0f-0 kQRoXr'>
                                        <span class='sc-4931bb0f-2 kUnXyt'
                                          >{$price}</span
                                        >
                                      </div>
                                    </div>
                                    <div class='sc-5528e80-5 gbueSb'>
                                      <div class='sc-bce95cb5-0 iBbYci'>
                                        <div
                                          class='ant-row ant-row-middle'
                                          style='
                                            margin-left: -7px;
                                            margin-right: -7px;
                                            row-gap: 14px;
                                          '
                                        >
                                          <div
                                            class='ant-col ant-col-xs-24 ant-col-md-12 ant-col-lg-12'
                                            style='
                                              padding-left: 7px;
                                              padding-right: 7px;
                                            '
                                          >
                                            <button
                                              type='button'
                                              class='buy_item ant-btn ant-btn-round ant-btn-primary sc-def5ee79-0 jgJJWM sc-ec08e75-0 eHNxhT sc-ec08e75-0 eHNxhT'
                                            >
                                              <span>В корзину</span>
                                            </button>
                                          </div>
                                          <div
                                            class='ant-col ant-col-xs-24 ant-col-md-12'
                                            style='
                                              padding-left: 7px;
                                              padding-right: 7px;
                                            '
                                          >
                                            <a
                                              href='{$page["url"]}'
                                              target='_blank'
                                              class='ant-btn ant-btn-round ant-btn-link ant-btn-lg ant-btn-block sc-def5ee79-0 bTuTgw gtm-fast-order gtm-fast-order'
                                              ><span
                                                class='sc-bce95cb5-2 fTzfUa'
                                                >Mac info</span
                                              ></a
                                            >
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </div>
                            </div>";

                if ( $pcount < 12 ) {

                    $cluster .= $html;
                    $pcount++;

                } elseif ( $pager == 0 ) {

                    echo $cluster;
                    $cluster = $html;
                    $pager++;
                    $pcount = 1;

                } else {

                    if ( substr( $cms["page"]["url"], -1, 1 ) == "/" ) {
                        $dir = "{$cms['site_dir']}{$cms['page']['url']}";
                        if ( ! file_exists( $dir ) ) {
                            mkdir( $dir, 0777, true );
                        }
                    }

                    $file = "{$cms['site_dir']}{$cms['page']['url']}{$pager}";
                    file_put_contents( $file, $cluster );
                    $cluster = $html;
                    $pager++;
                    $pcount = 1;

                }

            }
        }

        if ( $pager == 0 ) {

            echo $cluster;

        } else {

            if ( substr( $cms["page"]["url"], -1, 1 ) == "/" ) {
                $dir = "{$cms['site_dir']}{$cms['page']['url']}";
                if ( ! file_exists( $dir ) ) {
                    mkdir( $dir, 0777, true );
                }
            }

            $file = "{$cms['site_dir']}{$cms['page']['url']}{$pager}";
            file_put_contents( $file, $cluster );

        }

    }
?>
                    </div>
                    </div>
                    </div>
                    </div>
                    </section>
                  </div>
            </div>
         </div>
<script>
    document.addEventListener( "DOMContentLoaded", function( event ) {
        let n = 1;
        let lock = 0;
        window.addEventListener( "scroll", download );
        async function download() {
            if ( lock ) { return; } else { lock = 1; }
            let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
            let bottom = document.documentElement.clientHeight + 200;
            while ( windowRelativeBottom < bottom && n > 0 ) {
                let url = window.location.protocol + "//" + window.location.host + window.location.pathname + n;
                try {
                    let response = await fetch( url );
                    if ( response.ok ) { // HTTP-status: 200-299
                        let page = await response.text();
                        document.querySelector( "body > main" ).insertAdjacentHTML( "beforeend", page );
                        n++;
                        windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
                    } else if ( response.status == 404 ) {
                        n = 0;
                    }
                } catch( error ) {
                    alert( response.status );
                    n = 0;
                }
            }
            lock = 0;
        }
        download();
    } );
</script>
</main>