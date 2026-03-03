from rest_framework import viewsets, permissions, status 
from rest_framework.response import Response
from rest_framework.decorators import action
from . import selectors, services, serializers

class CourseViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        courses = selectors.get_available_courses()
        serializer = serializers.CourseOutputSerializer(courses, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        course = selectors.get_course_by_id(pk)
        serializer = serializers.CourseOutputSerializer(course)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated], url_path='enrollments')
    def enroll(self, request, pk=None):
        services.enroll_user_in_course(request.user, pk)
        return Response({"detail": "Đăng ký khóa học thành công."}, status=status.HTTP_201_CREATED)


class ForumPostViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        posts = selectors.get_all_forum_posts()
        serializer = serializers.ForumPostOutputSerializer(posts, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        post = selectors.get_post_by_id(pk)
        serializer = serializers.ForumPostOutputSerializer(post)
        return Response(serializer.data)

    def create(self, request):
        serializer = serializers.ForumPostInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = services.manage_forum_post('create', request.user, serializer.validated_data)
        return Response(serializers.ForumPostOutputSerializer(post).data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, pk=None):
        serializer = serializers.ForumPostInputSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        post = services.manage_forum_post('update', request.user, serializer.validated_data, post_id=pk)
        return Response(serializers.ForumPostOutputSerializer(post).data)

    def destroy(self, request, pk=None):
        services.manage_forum_post('delete', request.user, data={}, post_id=pk)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReplyViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        replies = selectors.get_all_replies()
        serializer = serializers.ReplyOutputSerializer(replies, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = serializers.ReplyInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.manage_reply('create', request.user, serializer.validated_data)
        return Response({"detail": "Tạo bình luận thành công."}, status=status.HTTP_201_CREATED)

    def partial_update(self, request, pk=None):
        serializer = serializers.ReplyInputSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        services.manage_reply('update', request.user, serializer.validated_data, reply_id=pk)
        return Response({"detail": "Cập nhật bình luận thành công."})

    def destroy(self, request, pk=None):
        services.manage_reply('delete', request.user, data={}, reply_id=pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

class LessonInteractionViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get','post'], url_path='comments')
    def comment(self, request, pk=None):
        if request.method == 'POST':
            serializer = serializers.LessonInteractionInputSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            services.interact_with_lesson(
                user=request.user, 
                course_id=serializer.validated_data['course_id'], 
                lesson_id=pk, 
                interaction_type='comment',
                comment_text=serializer.validated_data.get('comment')
            )
            return Response({"detail": "Đã thêm nhận xét."}, status=status.HTTP_201_CREATED)
        
        comments = selectors.get_comments_for_lesson(pk)
        serializer = serializers.LessonCommentOutputSerializer(comments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='likes')
    def like(self, request, pk=None):
        serializer = serializers.LessonInteractionInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_liked = services.interact_with_lesson(
            user=request.user, 
            course_id=serializer.validated_data['course_id'], 
            lesson_id=pk, 
            interaction_type='like'
        )
        msg = "Đã thích bài học." if is_liked else "Đã bỏ thích bài học."
        return Response({"detail": msg}, status=status.HTTP_200_OK)