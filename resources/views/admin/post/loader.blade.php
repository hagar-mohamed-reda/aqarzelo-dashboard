<div class="w3-modal w3-white post-loader" style="z-index: 10!important;display: none" >

	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<center>
		<i class="fa fa-spinner fa-spin w3-jumbo dark-theme-color animated infinite bounceIn" ></i>
		<br><br>
		{{ __("please_be_patient_while_upload_post_image") }}
		<br>
		<span v-html="uploadedImageCount"  ></span> / <span v-html="post.images.length" ></span>
	</center>
</div>
